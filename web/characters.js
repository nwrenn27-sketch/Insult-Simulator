// ============================================================
// characters.js — SVG builder, character roster, select screen
// ============================================================

// ---- Utility -----------------------------------------------

function resolveOpt(opt, p, s, e) {
    if (opt == null) return null;
    return typeof opt === 'function' ? opt(p, s, e) : opt;
}

// ---- SVG section builders ----------------------------------

const SEC_BASE = `
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
  <path d="M 34 261 Q 28 273 68 275 Q 75 266 68 260 Q 50 257 34 261 Z" fill="#111" stroke="black" stroke-width="2"/>`;

function secJersey(p, s) { return `
  <ellipse cx="50" cy="126" rx="30" ry="22" fill="${s}" stroke="black" stroke-width="2"/>
  <ellipse cx="150" cy="126" rx="30" ry="22" fill="${s}" stroke="black" stroke-width="2"/>
  <path d="M 38 120 Q 32 162 56 200 L 144 200 Q 168 162 162 120 Q 136 103 100 101 Q 64 103 38 120 Z" fill="white" stroke="black" stroke-width="2.5"/>
  <path d="M 38 120 Q 64 103 100 101 Q 136 103 162 120 Q 144 141 100 143 Q 56 141 38 120 Z" fill="${p}" stroke="black" stroke-width="2"/>
  <path d="M 40 165 Q 100 161 160 165 L 158 174 Q 100 170 42 174 Z" fill="${p}" stroke="black" stroke-width="1.5"/>`; }

function secLeftArm(p, s) { return `
  <path d="M 40 124 Q 20 148 16 186" stroke="${p}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <ellipse cx="17" cy="197" rx="26" ry="23" fill="${p}" stroke="black" stroke-width="2.5"/>
  <path d="M -6 183 Q -6 172 5 170 L 28 170 Q 40 172 40 183 L 40 193 Q 40 198 28 199 L 5 199 Q -6 198 -6 193 Z" fill="${s}" stroke="black" stroke-width="2"/>
  <path d="M -5 186 Q 17 182 39 186 M -5 192 Q 17 188 39 192" stroke="black" stroke-width="1.5" fill="none"/>`; }

function secRightArm(p, s) { return `
  <path d="M 160 124 Q 180 148 184 174" stroke="${p}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <ellipse cx="183" cy="185" rx="26" ry="23" fill="${p}" stroke="black" stroke-width="2.5"/>
  <path d="M 160 171 Q 160 160 171 158 L 194 158 Q 206 160 206 171 L 206 181 Q 206 186 194 187 L 171 187 Q 160 186 160 181 Z" fill="${s}" stroke="black" stroke-width="2"/>
  <path d="M 161 174 Q 183 170 205 174 M 161 180 Q 183 176 205 180" stroke="black" stroke-width="1.5" fill="none"/>`; }

const SEC_NECK_HEAD = `
  <rect x="88" y="107" width="24" height="18" rx="6" fill="#FFD4A3" stroke="black" stroke-width="2"/>
  <ellipse cx="100" cy="76" rx="38" ry="42" fill="#FFD4A3" stroke="black" stroke-width="2.5"/>
  <ellipse cx="62" cy="78" rx="10" ry="13" fill="#FFD4A3" stroke="black" stroke-width="2"/>
  <ellipse cx="62" cy="78" rx="5" ry="7" fill="#E8906A" opacity="0.45"/>
  <ellipse cx="138" cy="78" rx="10" ry="13" fill="#FFD4A3" stroke="black" stroke-width="2"/>
  <ellipse cx="138" cy="78" rx="5" ry="7" fill="#E8906A" opacity="0.45"/>
  <ellipse cx="79" cy="97" rx="14" ry="9" fill="#FF8877" opacity="0.45"/>
  <ellipse cx="121" cy="97" rx="14" ry="9" fill="#FF8877" opacity="0.45"/>`;

function secHelmet(p, s) { return `
  <path d="M 62 80 Q 61 26 100 23 Q 139 26 138 80 Z" fill="${p}" stroke="black" stroke-width="2.5"/>
  <path d="M 74 31 Q 100 25 126 33" stroke="rgba(255,255,255,0.3)" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="63" cy="77" rx="12" ry="16" fill="${s}" stroke="black" stroke-width="2"/>
  <ellipse cx="137" cy="77" rx="12" ry="16" fill="${s}" stroke="black" stroke-width="2"/>
  <path d="M 62 80 Q 100 86 138 80" stroke="black" stroke-width="2.5" fill="none"/>
  <path d="M 64 80 Q 100 87 136 80 L 134 91 Q 100 97 66 91 Z" fill="rgba(140,200,255,0.35)" stroke="black" stroke-width="2"/>`; }

function secFace(e) { return `
  <path d="M 78 89 Q 88 83 97 89" stroke="black" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 103 89 Q 112 83 122 89" stroke="black" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="88" cy="98" rx="10" ry="9" fill="white" stroke="black" stroke-width="2"/>
  <ellipse cx="112" cy="98" rx="10" ry="9" fill="white" stroke="black" stroke-width="2"/>
  <circle cx="90" cy="99" r="6" fill="${e}"/>
  <circle cx="114" cy="99" r="6" fill="${e}"/>
  <circle cx="91" cy="99" r="3" fill="black"/>
  <circle cx="115" cy="99" r="3" fill="black"/>
  <circle cx="93" cy="97" r="2" fill="white" opacity="0.9"/>
  <circle cx="117" cy="97" r="2" fill="white" opacity="0.9"/>
  <ellipse cx="100" cy="109" rx="8" ry="7" fill="#E8906A" stroke="#A85030" stroke-width="1.5"/>
  <ellipse cx="95" cy="111" rx="2.5" ry="2" fill="#A85030" opacity="0.65"/>
  <ellipse cx="105" cy="111" rx="2.5" ry="2" fill="#A85030" opacity="0.65"/>`; }

const SEC_MOUTH_YELL = `
  <path d="M 81 114 Q 100 128 119 114" fill="#7a0000" stroke="black" stroke-width="2"/>
  <path d="M 83 112 L 117 112 L 116 119 Q 100 126 84 119 Z" fill="white" stroke="black" stroke-width="1.5"/>
  <line x1="90" y1="112" x2="89" y2="119" stroke="#ccc" stroke-width="1.5"/>
  <line x1="100" y1="112" x2="100" y2="121" stroke="#ccc" stroke-width="1.5"/>
  <line x1="110" y1="112" x2="111" y2="119" stroke="#ccc" stroke-width="1.5"/>`;

// ---- Per-character visual overrides ------------------------

const OPTS_ROOKIE = {
    scaleX: 0.78,
    extras: `
  <path d="M 63 80 Q 100 87 137 80 L 135 93 Q 100 99 65 93 Z" fill="rgba(80,170,255,0.65)" stroke="rgba(120,200,255,0.9)" stroke-width="1.5"/>
  <circle cx="80" cy="104" r="1.5" fill="#CC8855" opacity="0.45"/>
  <circle cx="86" cy="106" r="1"   fill="#CC8855" opacity="0.35"/>
  <circle cx="114" cy="104" r="1.5" fill="#CC8855" opacity="0.45"/>
  <circle cx="120" cy="106" r="1"   fill="#CC8855" opacity="0.35"/>`,
};

const OPTS_VETERAN = {
    scaleX: 1.0,
    extras: `
  <path d="M 83 111 Q 100 105 117 111 Q 115 121 107 119 Q 100 118 93 119 Q 85 121 83 111 Z" fill="#e8e8e8" stroke="#bbb" stroke-width="1"/>
  <ellipse cx="100" cy="120" rx="20" ry="6" fill="#9a9a9a" opacity="0.12"/>`,
};

const OPTS_COACHES_SON = {
    scaleX: 1.18,
    mouth: `
  <path d="M 88 115 Q 100 122 112 114" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
  <path d="M 100 115 Q 109 119 113 114" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`,
};

const OPTS_FIGURE_SKATER = {
    scaleX: 0.60,
    helmet: `
  <path d="M 62 82 Q 60 28 100 21 Q 140 28 138 82 Q 118 70 100 68 Q 82 70 62 82 Z" fill="#7B3F00"/>
  <path d="M 72 26 Q 100 18 128 26" stroke="#9B5F20" stroke-width="5" fill="none" opacity="0.55" stroke-linecap="round"/>
  <path d="M 65 52 Q 100 47 135 52" stroke="#9B5F20" stroke-width="2.5" fill="none" opacity="0.35"/>
  <path d="M 62 82 Q 46 92 42 68 Q 44 46 60 54 Q 58 68 62 82 Z" fill="#7B3F00"/>
  <path d="M 138 82 Q 154 92 158 68 Q 156 46 140 54 Q 142 68 138 82 Z" fill="#7B3F00"/>`,
    mouth: `
  <path d="M 89 114 Q 100 121 111 114" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 94 112 Q 100 115 106 112" fill="#E8906A" stroke="none" opacity="0.6"/>`,
};

const OPTS_BEER_LEAGUER = {
    scaleX: 1.52,
    extras: `
  <circle cx="82" cy="112" r="1.2" fill="#7B6448" opacity="0.55"/>
  <circle cx="87" cy="114" r="1.2" fill="#7B6448" opacity="0.5"/>
  <circle cx="92" cy="116" r="1.2" fill="#7B6448" opacity="0.55"/>
  <circle cx="97" cy="117" r="1.2" fill="#7B6448" opacity="0.5"/>
  <circle cx="102" cy="117" r="1.2" fill="#7B6448" opacity="0.55"/>
  <circle cx="107" cy="116" r="1.2" fill="#7B6448" opacity="0.5"/>
  <circle cx="112" cy="114" r="1.2" fill="#7B6448" opacity="0.55"/>
  <circle cx="117" cy="112" r="1.2" fill="#7B6448" opacity="0.5"/>
  <circle cx="84"  cy="118" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="90"  cy="120" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="96"  cy="121" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="101" cy="121" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="107" cy="121" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="113" cy="120" r="1"   fill="#7B6448" opacity="0.4"/>
  <circle cx="118" cy="118" r="1"   fill="#7B6448" opacity="0.4"/>
  <ellipse cx="100" cy="187" rx="36" ry="11" fill="white" opacity="0.16"/>`,
};

const OPTS_GOALIE = {
    scaleX: 1.35,
    helmet: (p, s) => `
  <path d="M 62 80 Q 61 26 100 23 Q 139 26 138 80 Z" fill="${p}" stroke="black" stroke-width="2.5"/>
  <path d="M 68 38 Q 100 30 132 38 L 128 54 Q 100 48 72 54 Z" fill="${s}" opacity="0.65"/>
  <ellipse cx="52" cy="80" rx="18" ry="26" fill="${s}" stroke="black" stroke-width="2.5"/>
  <ellipse cx="148" cy="80" rx="18" ry="26" fill="${s}" stroke="black" stroke-width="2.5"/>
  <path d="M 62 80 Q 100 86 138 80" stroke="black" stroke-width="2.5" fill="none"/>`,
    extras: (p, s, e) => `
  <path d="M 63 80 Q 63 118 100 124 Q 137 118 137 80 Z" fill="${p}" stroke="black" stroke-width="2"/>
  <ellipse cx="83" cy="88" rx="13" ry="10" fill="rgba(0,0,0,0.85)"/>
  <ellipse cx="117" cy="88" rx="13" ry="10" fill="rgba(0,0,0,0.85)"/>
  <ellipse cx="83" cy="88" rx="9" ry="6" fill="${e}" opacity="0.45"/>
  <ellipse cx="117" cy="88" rx="9" ry="6" fill="${e}" opacity="0.45"/>
  <line x1="65" y1="98"  x2="135" y2="98"  stroke="black" stroke-width="2.5" opacity="0.45"/>
  <line x1="65" y1="110" x2="135" y2="110" stroke="black" stroke-width="2.5" opacity="0.45"/>
  <line x1="80" y1="80"  x2="81"  y2="122" stroke="black" stroke-width="2"   opacity="0.45"/>
  <line x1="100" y1="78" x2="100" y2="124" stroke="black" stroke-width="2"   opacity="0.45"/>
  <line x1="120" y1="80" x2="119" y2="122" stroke="black" stroke-width="2"   opacity="0.45"/>
  <path d="M 66 112 Q 100 122 134 112 Q 130 127 100 131 Q 70 127 66 112 Z" fill="${s}" stroke="black" stroke-width="1.5"/>`,
};

const OPTS_EUROPEAN_IMPORT = {
    scaleX: 0.78,
    extras: `
  <path d="M 62 82 Q 46 94 42 70 Q 44 48 60 55 Q 58 70 62 82 Z" fill="#2C1A0A"/>
  <path d="M 138 82 Q 154 94 158 70 Q 156 48 140 55 Q 142 70 138 82 Z" fill="#2C1A0A"/>
  <path d="M 52 94 Q 48 104 50 110" stroke="#2C1A0A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M 148 94 Q 152 104 150 110" stroke="#2C1A0A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
};

const OPTS_REF = {
    scaleX: 1.0,
    helmet: `
  <path d="M 62 82 Q 60 28 100 21 Q 140 28 138 82 Q 118 72 100 70 Q 82 72 62 82 Z" fill="#888"/>
  <path d="M 70 28 Q 100 21 130 28" stroke="#bbb" stroke-width="5" fill="none" opacity="0.7" stroke-linecap="round"/>
  <path d="M 66 52 Q 100 47 134 52" stroke="#aaa" stroke-width="2.5" fill="none" opacity="0.5"/>
  <ellipse cx="60"  cy="80" rx="11" ry="16" fill="#777" stroke="#555" stroke-width="1.5"/>
  <ellipse cx="140" cy="80" rx="11" ry="16" fill="#777" stroke="#555" stroke-width="1.5"/>`,
    rightArm: (p, s) => `
  <path d="M 160 128 Q 178 102 182 74" stroke="${p}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <ellipse cx="182" cy="64" rx="24" ry="22" fill="${p}" stroke="black" stroke-width="2.5"/>
  <path d="M 160 50 Q 160 39 171 37 L 194 39 Q 204 41 202 52 L 200 62 Q 198 68 186 69 L 163 67 Q 157 65 160 50 Z" fill="${s}" stroke="black" stroke-width="2"/>
  <rect x="172" y="30" width="20" height="9" rx="3" fill="#DAA520" stroke="#888" stroke-width="1.5"/>
  <line x1="182" y1="30" x2="182" y2="18" stroke="#aaa" stroke-width="1.5"/>
  <circle cx="182" cy="16" r="3.5" fill="#DAA520" stroke="#888" stroke-width="1"/>`,
    extras: `
  <path d="M 40 128 Q 100 124 160 128 L 160 137 Q 100 133 40 137 Z" fill="black" opacity="0.82"/>
  <path d="M 40 146 Q 100 142 160 146 L 160 155 Q 100 151 40 155 Z" fill="black" opacity="0.82"/>
  <path d="M 42 163 Q 100 159 158 163 L 157 172 Q 100 168 43 172 Z" fill="black" opacity="0.82"/>
  <path d="M 44 180 Q 100 176 156 180 L 155 189 Q 100 185 45 189 Z" fill="black" opacity="0.82"/>
  <path d="M 89 116 Q 100 120 111 116" stroke="#ccc" stroke-width="1.5" fill="none"/>
  <rect x="96" y="119" width="8" height="5" rx="1.5" fill="#DAA520" stroke="#777" stroke-width="1"/>`,
};

// ---- SVG builder -------------------------------------------

function makeCharacterSVG(primary, secondary, eyeColor, number, mirrored = false, opts = {}) {
    const helmet   = resolveOpt(opts.helmet,   primary, secondary, eyeColor) ?? secHelmet(primary, secondary);
    const mouth    = resolveOpt(opts.mouth,    primary, secondary, eyeColor) ?? SEC_MOUTH_YELL;
    const rightArm = resolveOpt(opts.rightArm, primary, secondary, eyeColor) ?? secRightArm(primary, secondary);
    const extras   = resolveOpt(opts.extras,   primary, secondary, eyeColor) ?? '';

    const body = `
  ${SEC_BASE}
  ${secJersey(primary, secondary)}
  ${secLeftArm(primary, secondary)}
  ${rightArm}
  ${SEC_NECK_HEAD}
  ${helmet}
  ${secFace(eyeColor)}
  ${mouth}
  ${extras}`;

    const numText = `<text x="100" y="160" text-anchor="middle" fill="${primary}" font-size="22" font-weight="bold" font-family="Arial Black, Arial, sans-serif">${number}</text>`;

    const scaleX  = opts.scaleX ?? 1;
    const scaled  = scaleX !== 1
        ? `<g transform="translate(100,0) scale(${scaleX},1) translate(-100,0)">${body}</g>`
        : body;
    const inner   = mirrored
        ? `<g transform="scale(-1,1) translate(-200,0)">${scaled}</g>`
        : scaled;

    return `<svg class="hockey-player" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" style="overflow:visible">${inner}${numText}</svg>`;
}

function getCharacterSVG(char, mirrored = false) {
    return makeCharacterSVG(char.primary, char.secondary, char.eyeColor, char.number, mirrored, char.opts ?? {});
}

// ---- Character roster --------------------------------------

const CHARACTERS = [
    {
        name:     'THE ROOKIE',
        number:   '97',
        primary:  '#FF6600',
        secondary:'#CC3300',
        eyeColor: '#FFD700',
        tagline:  'All talk. Limited tape time.',
        opts:     OPTS_ROOKIE,
    },
    {
        name:     'THE VETERAN',
        number:   '2',
        primary:  '#1A237E',
        secondary:'#0D1257',
        eyeColor: '#B8860B',
        tagline:  "Been here since before you were born. He'll remind you.",
        opts:     OPTS_VETERAN,
    },
    {
        name:     "THE COACH'S SON",
        number:   '1',
        primary:  '#F9A825',
        secondary:'#F57F17',
        eyeColor: '#1565C0',
        tagline:  "Doesn't need talent when dad owns the bench.",
        opts:     OPTS_COACHES_SON,
    },
    {
        name:     'THE FIGURE SKATER',
        number:   '10',
        primary:  '#8E24AA',
        secondary:'#6A0080',
        eyeColor: '#E040FB',
        tagline:  'Triple Axel. Triple threat. Triple offended.',
        opts:     OPTS_FIGURE_SKATER,
    },
    {
        name:     'THE BEER LEAGUER',
        number:   '69',
        primary:  '#2E7D32',
        secondary:'#1B5E20',
        eyeColor: '#A1887F',
        tagline:  'Peaked at 17. Still out here though.',
        opts:     OPTS_BEER_LEAGUER,
    },
    {
        name:     'THE GOALIE',
        number:   '31',
        primary:  '#0D1117',
        secondary:'#1C2A1C',
        eyeColor: '#00FFCC',
        tagline:  'Between the pipes and beyond reason.',
        opts:     OPTS_GOALIE,
    },
    {
        name:     'THE EUROPEAN IMPORT',
        number:   '19',
        primary:  '#D32F2F',
        secondary:'#B71C1C',
        eyeColor: '#1976D2',
        tagline:  'Speaks three languages. All of them devastating.',
        opts:     OPTS_EUROPEAN_IMPORT,
    },
    {
        name:     'THE REF',
        number:   '0',
        primary:  '#455A64',
        secondary:'#263238',
        eyeColor: '#FF6F00',
        tagline:  'Off the clock. Still calling penalties.',
        opts:     OPTS_REF,
    },
];

// ---- Character select screen --------------------------------

const csState = { p1: 0, p2: 1 };

function renderPicker(player) {
    const idx  = csState[`p${player}`];
    const char = CHARACTERS[idx];

    const spriteEl = document.getElementById(`p${player}-sprite`);
    spriteEl.classList.remove('animating');
    void spriteEl.offsetWidth;
    spriteEl.classList.add('animating');

    spriteEl.innerHTML = getCharacterSVG(char, player === 2);
    document.getElementById(`p${player}-char-name`).textContent    = char.name;
    document.getElementById(`p${player}-char-tagline`).textContent = char.tagline;
    document.getElementById(`p${player}-dots`).innerHTML = CHARACTERS.map((_, i) =>
        `<div class="cs-dot${i === idx ? ' active' : ''}"></div>`
    ).join('');
}

function cyclePicker(player, dir) {
    const key = `p${player}`;
    csState[key] = (csState[key] + dir + CHARACTERS.length) % CHARACTERS.length;
    renderPicker(player);
}

function startGame() {
    const char1 = CHARACTERS[csState.p1];
    const char2 = CHARACTERS[csState.p2];

    // Expose names to game.js globals
    p1CharName = char1.name;
    p2CharName = char2.name;

    document.querySelector('#character1 .character-sprite').innerHTML = getCharacterSVG(char1, false);
    document.querySelector('#character2 .character-sprite').innerHTML = getCharacterSVG(char2, true);

    document.getElementById('character-select').style.display = 'none';
    document.getElementById('game-screen').style.display      = 'flex';

    resetGame();
}

// ---- Boot --------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    renderPicker(1);
    renderPicker(2);

    document.getElementById('p1-prev').addEventListener('click', () => cyclePicker(1, -1));
    document.getElementById('p1-next').addEventListener('click', () => cyclePicker(1,  1));
    document.getElementById('p2-prev').addEventListener('click', () => cyclePicker(2, -1));
    document.getElementById('p2-next').addEventListener('click', () => cyclePicker(2,  1));
    document.getElementById('cs-start').addEventListener('click', startGame);

    document.addEventListener('keydown', e => {
        if (document.getElementById('character-select').style.display === 'none') return;
        switch (e.key) {
            case 'a': case 'A':     cyclePicker(1, -1); break;
            case 'd': case 'D':     cyclePicker(1,  1); break;
            case 'ArrowLeft':       e.preventDefault(); cyclePicker(2, -1); break;
            case 'ArrowRight':      e.preventDefault(); cyclePicker(2,  1); break;
            case 'Enter': case ' ': e.preventDefault(); startGame();        break;
        }
    });
});
