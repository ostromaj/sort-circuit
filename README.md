# Sort Circuit 🗿

A 3D temple escape for IB Computer Science (first exams 2027) **B2.4 Programming algorithms**, with **SL** and **HL** modes.

Students are sealed in stone chambers while the walls grind inward. The only way to hold them back is to **run the algorithm themselves**: lift the carved stones, make every swap, drop every half of a binary search. Correct moves shove the walls back; mistakes make them lurch in. If the walls reach the stones, you're crushed and get a fresh row. Between chambers, outrun the boulder.

**Play:** https://ostromaj.github.io/sort-circuit/

## How it plays (about 25 minutes)

| Chamber | SL | HL |
|---|---|---|
| 1 · The Bubbling Vault | Bubble sort ×2 | Bubble sort + selection sort |
| 2 | Hall of the Smallest: selection sort ×2 | The Halving Pit: binary search ×2 (one not found) |
| 3 | The Halving Pit: binary search ×2 (one not found) | The Recursion Well: quicksort ×2 |
| 4 · Chamber of Trials | Bubble, selection, binary search, faster walls | Bubble, selection, quicksort, faster walls |
| 5 · The Idol’s Sanctum | Bigger rows, a missing value, fastest walls | 8-stone quicksort, a missing value, fastest walls |

**Moves:**
- **Swap:** click a stone to lift it, then click the other (keyboard: ← → to choose, Enter to lift)
- **Leave it:** the button or space bar, when the algorithm says no swap
- **Binary search:** click the MID stone to lift it, then drop the part that can’t hold the target into the pit

Every step is checked against the real algorithm. A wrong move explains what should have happened, and two misses on the same step make the right stones glow. Live pseudocode (📜) highlights the line being run, and glowing floor zones and tags show J, I, LOW/MID/HIGH, the pivot, and the small zone.

**The addictive bits:**
- **The walls:** a constant ticking threat. Correct moves buy time, mistakes cost 6 seconds, and the leftover time is bonus points
- **Streak multiplier:** ×1.5 at 5 correct moves in a row, ×2 at 10, ×3 at 20, with rising pitch on every move
- **Boulder run** (25 seconds between chambers): switch lanes to dodge stones, jump logs and pits, grab gold. Each stumble lets the boulder roll closer, and three flattens you. Every 12 coins earns a 🪵 **wedge** (max 3), which jams the chamber walls for 12 seconds

## Algorithm conventions (shown to students in the game)

| Algorithm | Convention |
|---|---|
| Bubble sort | Compare neighbours left to right, swap if left > right. Stop after a pass with no swaps. |
| Selection sort | Pass I swaps the smallest value in A[I..N-1] into index I. |
| Binary search | MID = (LOW + HIGH) div 2 (rounded down). A[MID] < target → LOW = MID + 1; A[MID] > target → HIGH = MID - 1; not found when LOW > HIGH. |
| Quicksort (HL) | Pivot = last value of the section (Lomuto partition). Left section before right. |

After each row, students see the Big O for that algorithm (B2.4.1), and for binary search, how many comparisons linear search would have needed (B2.4.2).

| Mode | Content |
|---|---|
| **SL** | B2.4.1 efficiency and Big O, B2.4.2 linear vs binary search, B2.4.3 bubble and selection sort |
| **HL** | Everything in SL plus B2.4.4–B2.4.5 recursion, through quicksort |

Every row is randomly generated, and every step comes from running the real algorithm (`engine.js`), tested against separately written reference code.

## Class leaderboard

Students type a **class code** on the title screen (for example `cs-p3`). Scores go to the same Firebase project as Packet Thief, Neuron Nursery and Choo-Choo Queue, under `rooms/sc-sl-<code>` or `rooms/sc-hl-<code>`, with separate SL and HL boards. Open it with 🏆. If the school network blocks Firebase, the game still works and keeps a personal best on the device.

## Tech notes

- 3D with [three.js](https://threejs.org) r160, included in `vendor/` so it works even if the school blocks CDNs
- All textures are drawn in code (no image files); sound is synthesized
- Lowers its resolution and turns off shadows on its own if a Chromebook can’t keep up
- No flashing effects; respects reduced motion
