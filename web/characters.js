// characters.js - Character data and selection screen

function makeCharacterSVG(primary, secondary, eyeColor, number, mirrored = false) {
    const body = `
      <ellipse cx="100" cy="277" rx="56" ry="8" fill="rgba(0,0,0,0.25)"/>
      <ellipse cx="48" cy="274" rx="14" ry="5" fill="#222" stroke="black" stroke-width="1.5"/>
      <path d="M 56 250 L 55 264 Q 55 271 63 271 L 89 271 Q 96 271 94 264 L 92 250 Z" fill="#e8e8e8" stroke="black" stroke-width="2.5"/>
      <rect x="52" y="269" width="46" height="6" rx="3" fill="#aaa" stroke="black" stroke-width="1.5"/>
      <path d="M 108 250 L 107 264 Q 107 271 115 271 L 141 271 Q 148 271 146 264 L 144 250 Z" fill="#e8e8e8" stroke="black" stroke-width="2.5"/>
      <rect x="106" y="269" width="46" height="6" rx="3" fill="#aaa" stroke="black" stroke-width="1.5"/>
      <path d="M 61 253 Q 73 251 87 253 M 61 258 Q 73 256 87 258 M 61 263 Q 73 261 87 263" stroke="#444" stroke-width="1.5" fill="none"/>
      <path d="M 114 253 Q 126 251 140 253 M 114 258 Q 126 256 140 258 M 114 263 Q 126 261 140 263" stroke="#444" stroke-width="1.5" fill="none"/>
      <path d="M 60 200 Q 56 225 56 250 L 93 250 Q 93 225 95 200 Z" fill="#1a1a30" stroke="black" stroke-width="2.5"/>
      <rect x="59" y="216" width="32" height="32" rx="8" fill="#2c3e50" stroke="black" stroke-width="2"/>
      <rect x="63" y="220" width="24" height="24" rx="5" fill="#3a5070"/>
      <path d="M 105 200 Q 107 225 107 250 L 144 250 Q 144 225 140 200 Z" fill="#1a1a30" stroke="black" stroke-width="2.5"/>
      <rect x="109" y="216" width="32" height="32" rx="8" fill="#2c3e50" stroke="black" stroke-width="2"/>
      <rect x="113" y="220" width="24" height="24" rx="5" fill="#3a5070"/>
      <line x1="22" y1="195" x2="38" y2="265" stroke="#9B7820" stroke-width="9" stroke-linecap="round"/>
      <line x1="21" y1="195" x2="27" y2="218" stroke="#111" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
      <path d="M 34 261 Q 28 273 68 275 Q 75 266 68 260 Q 50 257 34 261 Z" fill="#111" stroke="black" stroke-width="2"/>
      <ellipse cx="50" cy="126" rx="30" ry="22" fill="${secondary}" stroke="black" stroke-width="2"/>
      <ellipse cx="150" cy="126" rx="30" ry="22" fill="${secondary}" stroke="black" stroke-width="2"/>
      <path d="M 38 120 Q 32 162 56 200 L 144 200 Q 168 162 162 120 Q 136 103 100 101 Q 64 103 38 120 Z" fill="white" stroke="black" stroke-width="2.5"/>
      <path d="M 38 120 Q 64 103 100 101 Q 136 103 162 120 Q 144 141 100 143 Q 56 141 38 120 Z" fill="${primary}" stroke="black" stroke-width="2"/>
      <path d="M 40 165 Q 100 161 160 165 L 158 174 Q 100 170 42 174 Z" fill="${primary}" stroke="black" stroke-width="1.5"/>
      <path d="M 40 124 Q 20 148 16 186" stroke="${primary}" stroke-width="28" fill="none" stroke-linecap="round"/>
      <ellipse cx="17" cy="197" rx="26" ry="23" fill="${primary}" stroke="black" stroke-width="2.5"/>
      <path d="M -6 183 Q -6 172 5 170 L 28 170 Q 40 172 40 183 L 40 193 Q 40 198 28 199 L 5 199 Q -6 198 -6 193 Z" fill="${secondary}" stroke="black" stroke-width="2"/>
      <path d="M -5 186 Q 17 182 39 186 M -5 192 Q 17 188 39 192" stroke="black" stroke-width="1.5" fill="none"/>
      <path d="M 160 124 Q 180 148 184 174" stroke="${primary}" stroke-width="28" fill="none" stroke-linecap="round"/>
      <ellipse cx="183" cy="185" rx="26" ry="23" fill="${primary}" stroke="black" stroke-width="2.5"/>
      <path d="M 160 171 Q 160 160 171 158 L 194 158 Q 206 160 206 171 L 206 181 Q 206 186 194 187 L 171 187 Q 160 186 160 181 Z" fill="${secondary}" stroke="black" stroke-width="2"/>
      <path d="M 161 174 Q 183 170 205 174 M 161 180 Q 183 176 205 180" stroke="black" stroke-width="1.5" fill="none"/>
      <rect x="88" y="107" width="24" height="18" rx="6" fill="#FFD4A3" stroke="black" stroke-width="2"/>
      <ellipse cx="100" cy="76" rx="38" ry="42" fill="#FFD4A3" stroke="black" stroke-width="2.5"/>
      <ellipse cx="62" cy="78" rx="10" ry="13" fill="#FFD4A3" stroke="black" stroke-width="2"/>
      <ellipse cx="62" cy="78" rx="5" ry="7" fill="#E8906A" opacity="0.45"/>
      <ellipse cx="138" cy="78" rx="10" ry="13" fill="#FFD4A3" stroke="black" stroke-width="2"/>
      <ellipse cx="138" cy="78" rx="5" ry="7" fill="#E8906A" opacity="0.45"/>
      <ellipse cx="79" cy="97" rx="14" ry="9" fill="#FF8877" opacity="0.45"/>
      <ellipse cx="121" cy="97" rx="14" ry="9" fill="#FF8877" opacity="0.45"/>
      <path d="M 62 80 Q 61 26 100 23 Q 139 26 138 80 Z" fill="${primary}" stroke="black" stroke-width="2.5"/>
      <path d="M 74 31 Q 100 25 126 33" stroke="rgba(255,255,255,0.3)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="63" cy="77" rx="12" ry="16" fill="${secondary}" stroke="black" stroke-width="2"/>
      <ellipse cx="137" cy="77" rx="12" ry="16" fill="${secondary}" stroke="black" stroke-width="2"/>
      <path d="M 62 80 Q 100 86 138 80" stroke="black" stroke-width="2.5" fill="none"/>
      <path d="M 64 80 Q 100 87 136 80 L 134 91 Q 100 97 66 91 Z" fill="rgba(140,200,255,0.35)" stroke="black" stroke-width="2"/>
      <path d="M 78 89 Q 88 83 97 89" stroke="black" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 103 89 Q 112 83 122 89" stroke="black" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="88" cy="98" rx="10" ry="9" fill="white" stroke="black" stroke-width="2"/>
      <ellipse cx="112" cy="98" rx="10" ry="9" fill="white" stroke="black" stroke-width="2"/>
      <circle cx="90" cy="99" r="6" fill="${eyeColor}"/>
      <circle cx="114" cy="99" r="6" fill="${eyeColor}"/>
      <circle cx="91" cy="99" r="3" fill="black"/>
      <circle cx="115" cy="99" r="3" fill="black"/>
      <circle cx="93" cy="97" r="2" fill="white" opacity="0.9"/>
      <circle cx="117" cy="97" r="2" fill="white" opacity="0.9"/>
      <ellipse cx="100" cy="109" rx="8" ry="7" fill="#E8906A" stroke="#A85030" stroke-width="1.5"/>
      <ellipse cx="95" cy="111" rx="2.5" ry="2" fill="#A85030" opacity="0.65"/>
      <ellipse cx="105" cy="111" rx="2.5" ry="2" fill="#A85030" opacity="0.65"/>
      <path d="M 81 114 Q 100 128 119 114" fill="#7a0000" stroke="black" stroke-width="2"/>
      <path d="M 83 112 L 117 112 L 116 119 Q 100 126 84 119 Z" fill="white" stroke="black" stroke-width="1.5"/>
      <line x1="90" y1="112" x2="89" y2="119" stroke="#ccc" stroke-width="1.5"/>
      <line x1="100" y1="112" x2="100" y2="121" stroke="#ccc" stroke-width="1.5"/>
      <line x1="110" y1="112" x2="111" y2="119" stroke="#ccc" stroke-width="1.5"/>`;

    const numText = `<text x="100" y="160" text-anchor="middle" fill="${primary}" font-size="22" font-weight="bold" font-family="Arial Black, Arial, sans-serif">${number}</text>`;
    const inner = mirrored
        ? `<g transform="scale(-1,1) translate(-200,0)">${body}</g>`
        : body;

    return `<svg class="hockey-player" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" style="overflow:visible">${inner}${numText}</svg>`;
}

// ---------------------------------------------------------------------------
// Character roster
// ---------------------------------------------------------------------------
const CHARACTERS = [
    {
        name:        'THE ROOKIE',
        number:      '97',
        primary:     '#FF6600',
        secondary:   '#CC3300',
        eyeColor:    '#FFD700',
        tagline:     'All talk. Limited tape time.',
        personality: 'Overconfident kid fresh out of juniors. Name-drops future stardom constantly.',
        insecurity:  'Deep down knows he has no business being here yet.',
    },
    {
        name:        'THE VETERAN',
        number:      '2',
        primary:     '#1A237E',
        secondary:   '#0D1257',
        eyeColor:    '#B8860B',
        tagline:     'Been here since before you were born. He\'ll remind you.',
        personality: 'Grizzled old-timer. Hates everything modern. Insults like it\'s 1987.',
        insecurity:  'Terrified of being forgotten. Hasn\'t figured out his phone.',
    },
    {
        name:        'THE COACH\'S SON',
        number:      '1',
        primary:     '#F9A825',
        secondary:   '#F57F17',
        eyeColor:    '#1565C0',
        tagline:     'Doesn\'t need talent when dad owns the bench.',
        personality: 'Entitled, thin-skinned, absolutely convinced the team would collapse without him.',
        insecurity:  'Knows he didn\'t earn a single thing. Will never admit it.',
    },
    {
        name:        'THE FIGURE SKATER',
        number:      '10',
        primary:     '#8E24AA',
        secondary:   '#6A0080',
        eyeColor:    '#E040FB',
        tagline:     'Triple Axel. Triple threat. Triple offended.',
        personality: 'Crossed over from competitive figure skating. Elegant, precise, absolutely vicious.',
        insecurity:  'Still gets chirped about the sequins. It haunts them.',
    },
    {
        name:        'THE BEER LEAGUER',
        number:      '69',
        primary:     '#2E7D32',
        secondary:   '#1B5E20',
        eyeColor:    '#A1887F',
        tagline:     'Peaked at 17. Still out here though.',
        personality: '45-year-old dad. Sunday night league. Talks about his glory days to anyone who\'ll listen.',
        insecurity:  'Definitely does not still have it. The knees know.',
    },
    {
        name:        'THE GOALIE',
        number:      '31',
        primary:     '#0D1117',
        secondary:   '#1C2A1C',
        eyeColor:    '#00FFCC',
        tagline:     'Between the pipes and beyond reason.',
        personality: 'Goalies are famously unhinged. Superstitious, paranoid, talks to the posts between plays.',
        insecurity:  'Everyone blames the goalie. Every single time.',
    },
    {
        name:        'THE EUROPEAN IMPORT',
        number:      '19',
        primary:     '#D32F2F',
        secondary:   '#B71C1C',
        eyeColor:    '#1976D2',
        tagline:     'Speaks three languages. All of them devastating.',
        personality: 'Flashy skill player from overseas. Technically flawless. Culturally bewildered.',
        insecurity:  'Desperately homesick. The food here is an insult to him personally.',
    },
    {
        name:        'THE REF',
        number:      '0',
        primary:     '#455A64',
        secondary:   '#263238',
        eyeColor:    '#FF6F00',
        tagline:     'Off the clock. Still calling penalties.',
        personality: 'Off-duty referee who cannot turn it off. Sees every conversation as a violation.',
        insecurity:  'Nobody has ever respected a ref. Not once in history.',
    },
];

// ---------------------------------------------------------------------------
// Selection state
// ---------------------------------------------------------------------------
const charSelectState = { p1: 0, p2: 1 };

function renderPicker(player) {
    const idx    = charSelectState[`p${player}`];
    const char   = CHARACTERS[idx];
    const mirror = player === 2;

    const spriteEl = document.getElementById(`p${player}-sprite`);
    const nameEl   = document.getElementById(`p${player}-char-name`);
    const tagEl    = document.getElementById(`p${player}-char-tagline`);
    const dotsEl   = document.getElementById(`p${player}-dots`);

    // Pop animation
    spriteEl.classList.remove('animating');
    void spriteEl.offsetWidth; // force reflow to restart animation
    spriteEl.classList.add('animating');

    spriteEl.innerHTML = makeCharacterSVG(char.primary, char.secondary, char.eyeColor, char.number, mirror);
    nameEl.textContent  = char.name;
    tagEl.textContent   = char.tagline;

    dotsEl.innerHTML = CHARACTERS.map((_, i) =>
        `<div class="cs-dot${i === idx ? ' active' : ''}"></div>`
    ).join('');
}

function cyclePicker(player, dir) {
    const key = `p${player}`;
    charSelectState[key] = (charSelectState[key] + dir + CHARACTERS.length) % CHARACTERS.length;
    renderPicker(player);
}

function startGame() {
    const char1 = CHARACTERS[charSelectState.p1];
    const char2 = CHARACTERS[charSelectState.p2];

    // Pass names to game.js globals before resetGame() reads them
    p1CharName = char1.name;
    p2CharName = char2.name;

    // Swap in-game sprites to match selections
    document.querySelector('#character1 .character-sprite').innerHTML =
        makeCharacterSVG(char1.primary, char1.secondary, char1.eyeColor, char1.number, false);
    document.querySelector('#character2 .character-sprite').innerHTML =
        makeCharacterSVG(char2.primary, char2.secondary, char2.eyeColor, char2.number, true);

    resetGame();

    document.getElementById('character-select').style.display = 'none';
    document.getElementById('game-screen').style.display      = 'flex';
}

// ---------------------------------------------------------------------------
// Boot character select on load
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    renderPicker(1);
    renderPicker(2);

    document.getElementById('p1-prev').addEventListener('click', () => cyclePicker(1, -1));
    document.getElementById('p1-next').addEventListener('click', () => cyclePicker(1,  1));
    document.getElementById('p2-prev').addEventListener('click', () => cyclePicker(2, -1));
    document.getElementById('p2-next').addEventListener('click', () => cyclePicker(2,  1));
    document.getElementById('cs-start').addEventListener('click', startGame);

    document.addEventListener('keydown', e => {
        // Only intercept while character select is visible
        if (document.getElementById('character-select').style.display === 'none') return;
        switch (e.key) {
            case 'a': case 'A':      cyclePicker(1, -1); break;
            case 'd': case 'D':      cyclePicker(1,  1); break;
            case 'ArrowLeft':        e.preventDefault(); cyclePicker(2, -1); break;
            case 'ArrowRight':       e.preventDefault(); cyclePicker(2,  1); break;
            case 'Enter': case ' ':  e.preventDefault(); startGame();        break;
        }
    });
});
