# Zen Garden

A quiet browser game modelled on the automatic zen-garden desk gadget: a round tray of sand, a rake bar turning slowly around a center post. The garden starts uneven, with holes and not enough sand. Your only job is to judge how much sand is missing and add it, ideally in one pour, then wait for the rake to carry it into the holes.

One round takes about three to five minutes. Meant as a micro-break.

## How to play

1. Press **Start raking**. Study the holes while the rake does its first pass.
2. Hold **Add sand**. A ghost mound grows at the hopper spot, drawn at the same scale and slope as the holes, so you can compare volumes by eye. Release to pour.
3. Wait. The rake shaves what is above level, carries it in a heap and drops it into whatever is below level. Sand drifts slowly across radii, so far holes fill last.
4. The round ends when every hole is level. If the heap in front of the rake vanishes while holes remain, you poured too little; add more, at a cost.

## Scoring

```
pour multiplier   1 pour 1.0 · 2 pours 0.75 · 3 pours 0.55 · 4+ pours 0.4
excess e          (added − needed) / needed
precision         e ≤ 0.10 → 1.0, otherwise max(0.2, 1 − 1.5·(e − 0.10))
score             1000 · multiplier · precision
```

A single pour that is up to about a quarter too generous still beats any two-pour game. Five stones from 900 points, four from 750, three from 550, two from 350.

## Running

Open `index.html` in a browser, or serve the folder (no-cache headers, so edits show on reload):

```bash
node serve.mjs 8791
```

Sound is off by default; the toggle remembers your choice.

## Debug parameters

- `?seed=123` reproduces a garden.
- `?speed=20` runs the simulation 20× faster.
- `?debug=1` shows deficit, added sand, remaining deficit, carried sand and a conservation check.
- In the console, `__debug.pour(v)` pours `v` sand units, `__debug.sim.S.D` is the exact deficit.

## Tuning

The simulation between the `SIM BEGIN` and `SIM END` markers is DOM-free and can be extracted and run in Node to sweep constants. Key constants live in `CFG` at the top of the script.
