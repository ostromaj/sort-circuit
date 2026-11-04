# Sort Circuit ⚡

Static, a gremlin made of pure interference, has scrambled the data. Students pick up the blocks and **run the algorithms themselves**: every comparison, every swap, every half thrown away. An IB Computer Science (first exams 2027) **B2.4 Programming algorithms** game with **SL** and **HL** modes.

**Play:** https://ostromaj.github.io/sort-circuit/

## How it plays (about 20–25 minutes)

Five circuits, 2–3 arrays each, with **Static Smash** between circuits.

| Circuit | SL | HL |
|---|---|---|
| 1 · Boot Up | Bubble sort ×2 | Bubble sort + selection sort |
| 2 | Selection Station: selection sort ×2 | Search Party: binary search ×2 (one not found) |
| 3 | Search Party: binary search ×2 (one not found) | Recursion Reactor: quicksort ×2 |
| 4 · Mixed Signals | Bubble, selection, binary search + Static attacks | Bubble, selection, quicksort + Static attacks |
| 5 · Static’s Overload (boss) | Bigger arrays, a missing value, more attacks | 8-block quicksort, a missing value, more attacks |

**Moves:**
- **Swap:** drag one block onto another, or tap one and then the other
- **Leave it:** the button (or space bar) when the algorithm says no swap
- **Binary search:** tap the MID block to pick it up, then toss the part that can’t hold the target

Every step is checked against the real algorithm. A wrong move resets the streak and Static explains what should have happened; two misses on the same step highlight the right move. Live pseudocode on the side lights up the line being run.

**The addictive bits:**
- **Streak multiplier:** ×1.5 at 5 correct moves in a row, ×2 at 10, ×3 at 20, with rising pitch on every move
- **Static Smash** (20 seconds between circuits): tap Static and he splits into two smaller, faster Statics, asteroids-style. Combos build if you zap quickly. Every 15 zaps earns a 🛡️ shield (max 3)
- **Static attacks** (circuits 4–5): he pops up with a burning fuse. Tap him in time, or he fuzzes the blocks so students have to remember where values were. A shield blocks one attack

Points come mostly from the algorithm work (moves, finishing, speed, no-mistake bonuses), so Static Smash can’t carry a leaderboard on its own.

## Algorithm conventions (shown to students in the game)

| Algorithm | Convention |
|---|---|
| Bubble sort | Compare neighbours left to right, swap if left > right. Stop after a pass with no swaps. |
| Selection sort | Pass I swaps the smallest value in A[I..N-1] into index I. |
| Binary search | MID = (LOW + HIGH) div 2 (rounded down). A[MID] < target → LOW = MID + 1; A[MID] > target → HIGH = MID - 1; not found when LOW > HIGH. |
| Quicksort (HL) | Pivot = last value of the section (Lomuto partition). Left section before right. |

After each array, students see the Big O for that algorithm (B2.4.1), and for binary search, how many comparisons linear search would have needed (B2.4.2).

## SL vs HL

| Mode | Content |
|---|---|
| **SL** | B2.4.1 efficiency and Big O, B2.4.2 linear vs binary search, B2.4.3 bubble and selection sort |
| **HL** | Everything in SL plus B2.4.4–B2.4.5 recursion, through quicksort |

Every array is randomly generated from that game’s numbers and every step comes from running the real algorithm (`engine.js`), which is tested against separately written reference code.

## Class leaderboard

Students type a **class code** on the title screen (for example `cs-p3`). Scores go to the same Firebase project as Packet Thief, Neuron Nursery and Choo-Choo Queue, under `rooms/sc-sl-<code>` or `rooms/sc-hl-<code>`, with separate SL and HL boards. Open it with 🏆. If the school network blocks Firebase, the game still works and keeps a personal best on the device.

## Other notes

- 🔊 toggles sound (synthesized, no audio files)
- No flashing effects; respects reduced motion
- Works with mouse, touch, and keyboard (Tab to a block, Enter to pick it up, space to leave it)
