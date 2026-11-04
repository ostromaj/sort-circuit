/* Sort Circuit: algorithm step engine.
   Each puzzle is a list of steps produced by actually running the algorithm, so what students are
   asked to do is always exactly what the algorithm does. Conventions (shown in the game):
   - Bubble sort: compare neighbours left to right, swap if left > right; after a pass with no swaps, stop.
   - Selection sort: pass I finds the smallest value in A[I..N-1] and swaps it into index I.
   - Binary search: LOW = 0, HIGH = N-1, MID = (LOW + HIGH) div 2; A[MID] < TARGET -> LOW = MID + 1,
     A[MID] > TARGET -> HIGH = MID - 1; stop when found or LOW > HIGH.
   - Quicksort (HL): pivot = last value of the section (Lomuto partition); sort the left section first.
   Step types:
     cmp   {a, b, swap, pass}          bubble: compare A[a] and A[a+1]; swap them or leave them
     place {i, m, swap, pass}          selection: swap the smallest remaining (index m) into index i
     mid   {low, high, mid}            binary: pick up the MID block
     cut   {low, high, mid, side}      binary: throw away the 'left' or 'right' part (MID goes with it)
     qcmp  {lo, hi, j, i, small, swap} quicksort: A[j] vs pivot; if smaller, swap it to index i+1
     pivot {lo, hi, to, swap}          quicksort: swap the pivot (index hi) into index to
   swap:false means the correct move is "leave it". */
(function (root) {
  'use strict';

  function makeRng(seed) {
    let s = (seed >>> 0) || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  let rnd = Math.random;
  function setSeed(seed) { rnd = seed === undefined ? Math.random : makeRng(seed); }
  const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function distinct(n, lo, hi) { const set = new Set(); while (set.size < n) set.add(ri(lo, hi)); return shuffle([...set]); }

  function bubbleOps(start) {
    const a = start.slice(), n = a.length, ops = [];
    for (let pass = 0; pass < n - 1; pass++) {
      let swaps = 0;
      for (let j = 0; j < n - 1 - pass; j++) {
        const swap = a[j] > a[j + 1];
        ops.push({ t: 'cmp', a: j, b: j + 1, swap, pass, x: a[j], y: a[j + 1] });
        if (swap) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; swaps++; }
      }
      if (!swaps) break;
    }
    return { ops, end: a };
  }

  function selectionOps(start) {
    const a = start.slice(), n = a.length, ops = [];
    for (let i = 0; i < n - 1; i++) {
      let m = i;
      for (let j = i + 1; j < n; j++) if (a[j] < a[m]) m = j;
      ops.push({ t: 'place', i, m, swap: m !== i, pass: i, x: a[m] });
      [a[i], a[m]] = [a[m], a[i]];
    }
    return { ops, end: a };
  }

  function binaryOps(arr, target) {
    let low = 0, high = arr.length - 1; const ops = []; let found = -1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2), v = arr[mid];
      ops.push({ t: 'mid', low, high, mid, x: v });
      if (v === target) { found = mid; break; }
      if (v < target) { ops.push({ t: 'cut', low, high, mid, side: 'left', x: v }); low = mid + 1; }
      else { ops.push({ t: 'cut', low, high, mid, side: 'right', x: v }); high = mid - 1; }
    }
    return { ops, end: arr.slice(), found, comparisons: ops.filter(o => o.t === 'mid').length };
  }

  function quickOps(start) {
    const a = start.slice(), ops = [];
    let calls = 0;
    function partition(lo, hi) {
      const pivot = a[hi]; let i = lo - 1;
      for (let j = lo; j < hi; j++) {
        const small = a[j] < pivot;
        ops.push({ t: 'qcmp', lo, hi, j, i, small, swap: small && i + 1 !== j, x: a[j], pivot });
        if (small) { i++; [a[i], a[j]] = [a[j], a[i]]; }
      }
      ops.push({ t: 'pivot', lo, hi, to: i + 1, swap: i + 1 !== hi, pivot });
      [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
      return i + 1;
    }
    function qs(lo, hi) { if (lo < hi) { calls++; const p = partition(lo, hi); qs(lo, p - 1); qs(p + 1, hi); } }
    qs(0, a.length - 1);
    return { ops, end: a, calls };
  }

  const BIG_O = {
    bubble: 'Bubble sort: O(n²) time in the worst case, O(n) best case thanks to the early stop, and O(1) extra space (it sorts in place).',
    selection: 'Selection sort: O(n²) time in every case, because it always scans the whole unsorted part. O(1) extra space.',
    binary: 'Binary search: O(log n) time, because every comparison halves the region. The data must be sorted first.',
    quick: 'Quicksort: O(n log n) time on average, O(n²) in the worst case (bad pivots). The recursion uses O(log n) stack space on average.'
  };

  function build(spec) {
    const n = spec.n;
    for (let tries = 0; tries < 4000; tries++) {
      if (spec.kind === 'bubble') {
        const start = distinct(n, 3, 97), r = bubbleOps(start);
        const swaps = r.ops.filter(o => o.swap).length;
        if (swaps < n || r.ops.length > (spec.maxOps || 30)) continue;
        return { kind: 'bubble', algo: 'Bubble sort', start, ops: r.ops, end: r.end, bigO: BIG_O.bubble };
      }
      if (spec.kind === 'selection') {
        const start = distinct(n, 3, 97), r = selectionOps(start);
        const keeps = r.ops.filter(o => !o.swap).length;
        if (keeps > 1) continue; // at most one "already in place" pass
        return { kind: 'selection', algo: 'Selection sort', start, ops: r.ops, end: r.end, bigO: BIG_O.selection };
      }
      if (spec.kind === 'binary') {
        const arr = distinct(n, 2, 99).sort((a, b) => a - b), wantFound = spec.found !== false;
        let target;
        if (wantFound) target = arr[ri(0, n - 1)];
        else { target = ri(1, 100); if (arr.includes(target)) continue; }
        const r = binaryOps(arr, target);
        if ((r.found >= 0) !== wantFound || r.comparisons < 3) continue;
        return { kind: 'binary', algo: 'Binary search', start: arr, target, found: r.found, ops: r.ops, end: r.end, comparisons: r.comparisons,
          linear: wantFound ? arr.indexOf(target) + 1 : n, bigO: BIG_O.binary };
      }
      if (spec.kind === 'quick') {
        const start = distinct(n, 3, 97), r = quickOps(start);
        const swaps = r.ops.filter(o => o.swap).length;
        if (r.calls < 3 || r.calls > 5 || swaps < Math.ceil(n / 2) || r.ops.length > (spec.maxOps || 28)) continue;
        return { kind: 'quick', algo: 'Quicksort', start, ops: r.ops, end: r.end, calls: r.calls, bigO: BIG_O.quick };
      }
      throw new Error('unknown kind ' + spec.kind);
    }
    throw new Error('could not build ' + spec.kind);
  }

  const api = { build, bubbleOps, selectionOps, binaryOps, quickOps, setSeed, shuffle };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.SCEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
