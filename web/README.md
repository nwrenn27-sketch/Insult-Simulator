# Pond Hockey Insult Simulator

A two-player local browser game inspired by *Oh... Sir! The Insult Simulator*. Pick your character, take turns building chirps from a random word pool, and deal damage until someone's HP hits zero.

## How to Play

1. **Character Select** — Each player picks from 8 hockey characters using arrow buttons or keyboard shortcuts (Player 1: `A`/`D`, Player 2: `←`/`→`).
2. **Build your insult** — On your turn, click words from the pool to assemble a chirp in the display bubble.
3. **Fire!** — Hit the Fire button to launch your insult. Damage is calculated and applied to your opponent's health bar.
4. **Reset** — Clear your current selection and start over before firing.
5. First player to drain the opponent's HP to 0 wins the chirp-off.

## Characters

| Character | Number | Color |
|---|---|---|
| The Rookie | #97 | Orange |
| The Veteran | #2 | Navy |
| The Coach's Son | #1 | Gold |
| The Figure Skater | #10 | Purple |
| The Beer Leaguer | #69 | Green |
| The Goalie | #31 | Black |
| The European Import | #19 | Red |
| The Ref | #0 | Slate Grey |

## Damage Formula

`base 5 + (word count × 2) + bonuses + random(10)`, capped between 5 and 40 HP.

- **+10** for using at least one noun and one verb
- **+5** for including an ending
- **-10** for an unfinished insult (`...eh...`)

## Running Locally

No build step required — plain HTML, CSS, and JS.

```bash
python3 -m http.server 8080 --directory web
```

Then open [http://localhost:8080](http://localhost:8080).

## File Structure

```
web/
├── index.html      # Layout and screens
├── style.css       # All styles
├── words.js        # Nouns, verbs, and endings word lists
├── characters.js   # Character definitions and SVG sprite builder
└── game.js         # Game loop, word selection, damage, turn management
```
