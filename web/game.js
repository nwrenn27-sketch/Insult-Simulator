// Pond Hockey Insult Simulator - Game Logic

// Player names — set by character select before resetGame() is called
let p1CharName = 'Player 1';
let p2CharName = 'Player 2';

// Game constants
const AMOUNT = 13; // Board + Tea * 2
const MIN_NOUNS = 3;
const MAX_NOUNS = 5;
const MIN_VERBS = 3;
const MAX_VERBS = 5;

// Game state
let gameState = {
    currentPlayer: 1,
    round: 1,
    players: {
        1: { health: 100, name: 'Player 1' },
        2: { health: 100, name: 'Player 2' }
    },
    availableWords: [],
    selectedWords: [],
    completedInsult: []
};

// Word type classes
class Word {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    isNoun() { return this.type === 'noun'; }
    isVerb() { return this.type === 'verb'; }
    isEnding() { return this.type === 'ending'; }
    isAnd() { return this.type === 'and'; }
    isUnfinished() { return this.type === 'unfinished'; }
}

class Noun extends Word {
    constructor(heSheIt, text) {
        super('noun', { heSheIt, text });
    }

    getText() { return this.data.text; }
    getHeSheIt() { return this.data.heSheIt; }
}

class Verb extends Word {
    constructor(needsNoun, text) {
        super('verb', { needsNoun, text });
    }

    getText(heSheIt) {
        let text = this.data.text;

        // Replace grammar templates based on subject
        if (heSheIt) {
            text = text.replace(/\[is\/are\]/g, 'is')
                      .replace(/\[was\/were\]/g, 'was')
                      .replace(/\[has\/have\]/g, 'has')
                      .replace(/\(s\)/g, 's');
        } else {
            text = text.replace(/\[is\/are\]/g, 'are')
                      .replace(/\[was\/were\]/g, 'were')
                      .replace(/\[has\/have\]/g, 'have')
                      .replace(/\(s\)/g, '');
        }

        return text;
    }

    needsNoun() { return this.data.needsNoun; }
}

class Ending extends Word {
    constructor(text) {
        super('ending', { text });
    }

    getText() { return this.data.text; }
}

class AndWord extends Word {
    constructor() {
        super('and', {});
    }

    getText() { return 'and'; }
}

class Unfinished extends Word {
    constructor() {
        super('unfinished', {});
    }

    getText() { return '... eh... uhnn...'; }
}

// Random utility
function random(max) {
    return Math.floor(Math.random() * max);
}

function randomBool() {
    return Math.random() < 0.5;
}

function randomChoice(array) {
    return array[random(array.length)];
}

// Generate initial word pool
function generateWordPool() {
    const words = [];
    let numNouns = 0;
    let numVerbs = 0;

    while (words.length < AMOUNT) {
        if (numNouns < MAX_NOUNS && randomBool()) {
            numNouns++;
            const [heSheIt, text] = randomChoice(WORDS.nouns);
            words.push(new Noun(heSheIt, text));
        } else if (numVerbs < MAX_VERBS && randomBool()) {
            numVerbs++;
            const [needsNoun, text] = randomChoice(WORDS.verbs);
            words.push(new Verb(needsNoun, text));
        } else if (numNouns >= MIN_NOUNS && numVerbs >= MIN_VERBS) {
            const roll = random(10);
            if (roll === 0) {
                const [, text] = randomChoice(WORDS.endings);
                words.push(new Ending(text));
            } else if (roll === 1) {
                words.push(new AndWord());
            }
        }
    }

    return words;
}

// Generate AI insult
function generateAIInsult(words) {
    const completed = [];
    let currentHeSheIt = false;

    // Helper to find and remove word by type
    function takeWord(filterFn) {
        const matches = [];
        words.forEach((word, i) => {
            if (filterFn(word)) matches.push(i);
        });
        if (matches.length === 0) return null;
        const index = randomChoice(matches);
        return words.splice(index, 1)[0];
    }

    // Start with noun
    const firstNoun = takeWord(w => w.isNoun());
    if (firstNoun) {
        currentHeSheIt = firstNoun.getHeSheIt();
        completed.push(firstNoun);

        // Maybe add "and noun"
        if (randomBool() && takeWord(w => w.isAnd()) && takeWord(w => w.isNoun())) {
            completed.push(new AndWord());
            const secondNoun = takeWord(w => w.isNoun());
            if (secondNoun) {
                secondNoun.data.heSheIt = false; // Override to plural
                completed.push(secondNoun);
            }
        }
    }

    // Add verb
    const verb = takeWord(w => w.isVerb());
    if (verb) {
        completed.push(verb);
        if (verb.needsNoun()) {
            const noun = takeWord(w => w.isNoun());
            if (noun) {
                completed.push(noun);
            } else {
                completed.push(new Unfinished());
            }
        }

        // Maybe add "and verb"
        if (randomBool() && takeWord(w => w.isAnd()) && takeWord(w => w.isVerb())) {
            completed.push(new AndWord());
            const secondVerb = takeWord(w => w.isVerb());
            if (secondVerb) {
                completed.push(secondVerb);
                if (secondVerb.needsNoun()) {
                    const noun = takeWord(w => w.isNoun());
                    if (noun) {
                        completed.push(noun);
                    }
                }
            }
        }
    }

    // Maybe add ending
    if (randomBool()) {
        const ending = takeWord(w => w.isEnding());
        if (ending) completed.push(ending);
    }

    return { completed, currentHeSheIt };
}

// Format insult for display
function formatInsult(completed, currentHeSheIt) {
    let result = '';
    let heSheIt = currentHeSheIt;

    for (let i = 0; i < completed.length; i++) {
        const word = completed[i];

        if (word.isEnding()) {
            result += ',';
        }

        if (i > 0 && !word.isUnfinished()) {
            result += ' ';
        }

        if (word.isNoun()) {
            heSheIt = word.getHeSheIt();
            result += word.getText();
        } else if (word.isVerb()) {
            result += word.getText(heSheIt);
        } else if (word.isEnding()) {
            result += word.getText();
        } else if (word.isAnd()) {
            result += word.getText();
        } else if (word.isUnfinished()) {
            result += word.getText();
        }
    }

    const last = completed[completed.length - 1];
    if (last && !last.isEnding() && !last.isUnfinished()) {
        result += '!';
    }

    return result;
}

// Calculate damage based on insult quality
function calculateDamage(completed) {
    let damage = 5; // Base damage

    // More words = more damage
    damage += completed.length * 2;

    // Bonus for complete sentences
    const hasNoun = completed.some(w => w.isNoun());
    const hasVerb = completed.some(w => w.isVerb());
    if (hasNoun && hasVerb) damage += 10;

    // Bonus for endings
    if (completed.some(w => w.isEnding())) damage += 5;

    // Penalty for unfinished
    if (completed.some(w => w.isUnfinished())) damage -= 10;

    // Add some randomness
    damage += random(10);

    return Math.max(5, Math.min(40, damage));
}

// UI Functions
function updateHealthBar(player) {
    const health = gameState.players[player].health;
    const healthBar = document.getElementById(`player${player}-health`);
    healthBar.style.width = health + '%';

    // Color based on health
    if (health > 60) {
        healthBar.style.background = 'linear-gradient(to right, #4ade80, #22c55e)';
    } else if (health > 30) {
        healthBar.style.background = 'linear-gradient(to right, #fbbf24, #f59e0b)';
    } else {
        healthBar.style.background = 'linear-gradient(to right, #ef4444, #dc2626)';
    }
}

function updateTurnIndicator() {
    const turnText = document.getElementById('current-turn');
    turnText.textContent = gameState.players[gameState.currentPlayer].name;
}

function updateRound() {
    document.getElementById('round-number').textContent = gameState.round;
}

function displayInsult(text) {
    const insultDiv = document.getElementById('current-insult');
    insultDiv.textContent = text;
}

function showDamage(damage, target) {
    const indicator = document.getElementById('damage-indicator');
    indicator.textContent = `-${damage} HP`;
    indicator.style.display = 'block';
    indicator.classList.add('show');

    setTimeout(() => {
        indicator.classList.remove('show');
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 300);
    }, 1500);
}

function renderAvailableWords() {
    const container = document.getElementById('available-words');
    container.innerHTML = '';

    gameState.availableWords.forEach((word, index) => {
        const button = document.createElement('button');
        button.className = 'word-button';

        let displayText = '';
        if (word.isNoun()) {
            displayText = word.getText();
            button.classList.add('noun');
        } else if (word.isVerb()) {
            displayText = word.getText(true); // Show with singular form
            button.classList.add('verb');
        } else if (word.isEnding()) {
            displayText = word.getText();
            button.classList.add('ending');
        } else if (word.isAnd()) {
            displayText = 'and';
            button.classList.add('and');
        }

        button.textContent = displayText;
        button.onclick = () => selectWord(index);
        container.appendChild(button);
    });
}

function selectWord(index) {
    const word = gameState.availableWords.splice(index, 1)[0];
    gameState.selectedWords.push(word);
    updateCurrentInsult();
    renderAvailableWords();
}

function updateCurrentInsult() {
    if (gameState.selectedWords.length === 0) {
        displayInsult('Select words to build your insult!');
        return;
    }

    let heSheIt = false;
    const text = gameState.selectedWords.map(word => {
        if (word.isNoun()) {
            heSheIt = word.getHeSheIt();
            return word.getText();
        } else if (word.isVerb()) {
            return word.getText(heSheIt);
        } else if (word.isEnding()) {
            return word.getText();
        } else if (word.isAnd()) {
            return word.getText();
        }
    }).join(' ');

    displayInsult(text + '...');
}

function finishInsult() {
    if (gameState.selectedWords.length === 0) {
        alert('Select at least one word!');
        return;
    }

    // Calculate current player's insult
    let heSheIt = false;
    gameState.selectedWords.forEach(word => {
        if (word.isNoun()) heSheIt = word.getHeSheIt();
    });

    const insultText = formatInsult(gameState.selectedWords, heSheIt);
    const damage = calculateDamage(gameState.selectedWords);

    // Apply damage to other player
    const targetPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.players[targetPlayer].health = Math.max(0, gameState.players[targetPlayer].health - damage);

    // Show insult and damage
    displayInsult(insultText);
    showDamage(damage, targetPlayer);
    updateHealthBar(targetPlayer);

    // Check for winner
    if (gameState.players[targetPlayer].health <= 0) {
        setTimeout(() => {
            alert(`${gameState.players[gameState.currentPlayer].name} wins!`);
            resetGame();
        }, 2000);
        return;
    }

    // Next turn
    setTimeout(() => {
        nextTurn();
    }, 2500);
}

function nextTurn() {
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;

    if (gameState.currentPlayer === 1) {
        gameState.round++;
        updateRound();
    }

    // Generate new words
    gameState.availableWords = generateWordPool();
    gameState.selectedWords = [];

    updateTurnIndicator();
    renderAvailableWords();
    displayInsult('Select words to build your insult!');
}

function resetGame() {
    gameState = {
        currentPlayer: 1,
        round: 1,
        players: {
            1: { health: 100, name: p1CharName },
            2: { health: 100, name: p2CharName }
        },
        availableWords: generateWordPool(),
        selectedWords: [],
        completedInsult: []
    };

    document.getElementById('player1-name').textContent = p1CharName;
    document.getElementById('player2-name').textContent = p2CharName;
    updateHealthBar(1);
    updateHealthBar(2);
    updateTurnIndicator();
    updateRound();
    renderAvailableWords();
    displayInsult('Select words to build your insult!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('finish-insult-btn').addEventListener('click', finishInsult);
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    // Initialize game
    resetGame();
});

console.log('Pond Hockey Insult Simulator - Ready to play!');
