// ============================================================
// game.js — state, logic, UI rendering
// ============================================================

// ---- Globals set by characters.js before resetGame() -------
let p1CharName = 'PLAYER 1';
let p2CharName = 'PLAYER 2';

// ---- Constants ---------------------------------------------
const POOL_SIZE  = 13;
const NOUN_MIN   = 3;
const NOUN_MAX   = 5;
const VERB_MIN   = 3;
const VERB_MAX   = 5;
const BASE_DMG   = 5;
const MAX_DMG    = 40;

// ============================================================
// WORD CLASSES
// ============================================================

class Word {
    constructor(type, data) { this.type = type; this.data = data; }
    isNoun()       { return this.type === 'noun'; }
    isVerb()       { return this.type === 'verb'; }
    isEnding()     { return this.type === 'ending'; }
    isAnd()        { return this.type === 'and'; }
    isUnfinished() { return this.type === 'unfinished'; }
}

class Noun extends Word {
    constructor(singular, text) { super('noun', { singular, text }); }
    getText()    { return this.data.text; }
    isSingular() { return this.data.singular; }
    getHeSheIt() { return this.data.singular; } // legacy compat
}

class Verb extends Word {
    constructor(needsNoun, text) { super('verb', { needsNoun, text }); }
    needsNoun() { return this.data.needsNoun; }
    getText(singular) {
        let t = this.data.text;
        if (singular) {
            return t.replace(/\[is\/are\]/g,   'is')
                    .replace(/\[was\/were\]/g,  'was')
                    .replace(/\[has\/have\]/g,  'has')
                    .replace(/\(s\)/g,          's');
        }
        return     t.replace(/\[is\/are\]/g,   'are')
                    .replace(/\[was\/were\]/g,  'were')
                    .replace(/\[has\/have\]/g,  'have')
                    .replace(/\(s\)/g,          '');
    }
}

class Ending extends Word {
    constructor(text) { super('ending', { text }); }
    getText() { return this.data.text; }
}

class AndWord extends Word {
    constructor() { super('and', {}); }
    getText() { return 'and'; }
}

class Unfinished extends Word {
    constructor() { super('unfinished', {}); }
    getText() { return '...eh...'; }
}

// ============================================================
// UTILITY
// ============================================================

const rand     = n   => Math.floor(Math.random() * n);
const pick     = arr => arr[rand(arr.length)];

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = rand(i + 1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ============================================================
// WORD POOL — deterministic shuffle, no while loop
// ============================================================

function generateWordPool() {
    const nounCount = NOUN_MIN + rand(NOUN_MAX - NOUN_MIN + 1);
    const verbCount = VERB_MIN + rand(VERB_MAX - VERB_MIN + 1);
    const leftover  = POOL_SIZE - nounCount - verbCount;

    const nouns = shuffle(WORDS.nouns)
        .slice(0, nounCount)
        .map(([s, t]) => new Noun(s, t));

    const verbs = shuffle(WORDS.verbs)
        .slice(0, verbCount)
        .map(([n, t]) => new Verb(n, t));

    const extras = Array.from({ length: leftover }, () => {
        if (rand(4) === 0) {
            const [, t] = pick(WORDS.endings);
            return new Ending(t);
        }
        return new AndWord();
    });

    return shuffle([...nouns, ...verbs, ...extras]);
}

// ============================================================
// INSULT FORMATTING
// ============================================================

function formatInsult(words) {
    let result   = '';
    let singular = false;

    for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (w.isEnding()) result += ',';
        if (i > 0 && !w.isUnfinished()) result += ' ';

        if      (w.isNoun())       { singular = w.isSingular(); result += w.getText(); }
        else if (w.isVerb())       { result += w.getText(singular); }
        else if (w.isEnding())     { result += w.getText(); }
        else if (w.isAnd())        { result += 'and'; }
        else if (w.isUnfinished()) { result += w.getText(); }
    }

    const last = words[words.length - 1];
    if (last && !last.isEnding() && !last.isUnfinished()) result += '!';
    return result;
}

// ============================================================
// DAMAGE
// ============================================================

function calculateDamage(words) {
    let dmg = BASE_DMG + words.length * 2;
    if (words.some(w => w.isNoun()) && words.some(w => w.isVerb())) dmg += 10;
    if (words.some(w => w.isEnding()))     dmg += 5;
    if (words.some(w => w.isUnfinished())) dmg -= 10;
    dmg += rand(10);
    return Math.max(5, Math.min(MAX_DMG, dmg));
}

// ============================================================
// GAME STATE
// ============================================================

let state = {
    currentPlayer: 1,
    round: 1,
    players: {
        1: { health: 100, name: 'PLAYER 1' },
        2: { health: 100, name: 'PLAYER 2' },
    },
    pool:     [],
    selected: [],
};

// ============================================================
// UI — RENDERING
// ============================================================

function renderHealth(player) {
    const hp  = state.players[player].health;
    const bar = document.getElementById(`player${player}-health`);
    bar.style.width = hp + '%';

    const seg = 'repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(0,0,0,0.35) 9px, rgba(0,0,0,0.35) 10px)';
    if (hp > 60) {
        bar.style.backgroundImage = '';
        bar.style.boxShadow       = '';
    } else if (hp > 30) {
        bar.style.backgroundImage = `${seg}, linear-gradient(90deg, #ffdd44 0%, #ffaa00 100%)`;
        bar.style.boxShadow       = '0 0 14px rgba(255,180,0,0.55)';
    } else {
        bar.style.backgroundImage = `${seg}, linear-gradient(90deg, #ff8888 0%, #ff2244 100%)`;
        bar.style.boxShadow       = '0 0 18px rgba(255,34,68,0.7)';
    }
}

function renderRound() {
    document.getElementById('round-number').textContent = state.round;
}

function renderTurnIndicator() {
    document.getElementById('current-turn').textContent = state.players[state.currentPlayer].name;
}

function renderInsult(text) {
    document.getElementById('current-insult').textContent = text;
}

function renderWordPool() {
    const container = document.getElementById('available-words');
    container.innerHTML = '';

    state.pool.forEach((word, i) => {
        const btn = document.createElement('button');
        btn.className = 'word-button';

        if      (word.isNoun())   { btn.textContent = word.getText();       btn.classList.add('noun'); }
        else if (word.isVerb())   { btn.textContent = word.getText(true);   btn.classList.add('verb'); }
        else if (word.isEnding()) { btn.textContent = word.getText();       btn.classList.add('ending'); }
        else if (word.isAnd())    { btn.textContent = 'and';                btn.classList.add('and'); }

        btn.addEventListener('click', () => selectWord(i));
        container.appendChild(btn);
    });
}

function renderSelectedWords() {
    if (state.selected.length === 0) {
        renderInsult(state.lastInsultText || 'Select words to build your insult!');
        return;
    }
    const text = formatInsult(state.selected).replace(/!$/, '...');
    renderInsult(text);
}

function showDamage(dmg) {
    const el = document.getElementById('damage-indicator');
    el.textContent = `-${dmg} HP`;
    el.style.display = 'block';
    el.classList.remove('show');
    void el.offsetWidth; // restart animation
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => { el.style.display = 'none'; }, 300);
    }, 1500);
}

function showFog(player) {
    const fog = document.getElementById(`p${player}-fog`);
    fog.classList.add('active');
    setTimeout(() => fog.classList.remove('active'), 900);
}

function animateCharacter(player, cls) {
    const el = document.getElementById(`character${player}`);
    el.classList.add(cls);
    el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}

// ============================================================
// WIN SCREEN
// ============================================================

function showWinScreen(winnerName) {
    document.getElementById('go-winner-text').textContent = winnerName;
    document.getElementById('game-over-overlay').style.display = 'flex';
}

function hideWinScreen() {
    document.getElementById('game-over-overlay').style.display = 'none';
}

// ============================================================
// GAME ACTIONS
// ============================================================

function selectWord(index) {
    const word = state.pool.splice(index, 1)[0];
    state.selected.push(word);
    showFog(state.currentPlayer);
    renderWordPool();
    renderSelectedWords();
}

function finishInsult() {
    if (state.selected.length === 0) return;

    const attacker = state.currentPlayer;
    const defender = attacker === 1 ? 2 : 1;
    const text      = formatInsult(state.selected);
    const dmg       = calculateDamage(state.selected);

    state.players[defender].health = Math.max(0, state.players[defender].health - dmg);
    state.lastInsultText = text;

    renderInsult(text);
    showDamage(dmg);
    renderHealth(defender);
    animateCharacter(attacker, 'attacking');
    animateCharacter(defender, 'damaged');

    if (state.players[defender].health <= 0) {
        setTimeout(() => showWinScreen(state.players[attacker].name), 1800);
        return;
    }

    setTimeout(nextTurn, 2500);
}

function nextTurn() {
    state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
    if (state.currentPlayer === 1) {
        state.round++;
        renderRound();
    }
    state.pool     = generateWordPool();
    state.selected = [];
    renderWordPool();
    renderSelectedWords();
    renderTurnIndicator();
}

function resetGame() {
    hideWinScreen();
    state = {
        currentPlayer: 1,
        round: 1,
        players: {
            1: { health: 100, name: p1CharName },
            2: { health: 100, name: p2CharName },
        },
        pool:          generateWordPool(),
        selected:      [],
        lastInsultText: '',
    };
    document.getElementById('player1-name').textContent = p1CharName;
    document.getElementById('player2-name').textContent = p2CharName;
    renderHealth(1);
    renderHealth(2);
    renderRound();
    renderTurnIndicator();
    renderWordPool();
    renderSelectedWords();
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('finish-insult-btn').addEventListener('click', finishInsult);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('go-rematch-btn').addEventListener('click', resetGame);
    document.getElementById('go-menu-btn').addEventListener('click', () => {
        hideWinScreen();
        document.getElementById('game-screen').style.display      = 'none';
        document.getElementById('character-select').style.display = 'flex';
    });

    resetGame();
});
