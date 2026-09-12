# Zen Garden

A relaxing sand-garden game: estimate how much sand the holes need and let the rake do the rest.

Modelled on the automatic zen-garden desk gadget: a round tray of sand, a rake bar turning slowly around a center post. The garden starts uneven, with holes and not enough sand. Your job is to estimate how much sand is missing and add it, then wait for the rake to carry it into the holes. You can pour as many times as you like; a close estimate in few pours scores best.

One round takes about three to five minutes. Meant as a micro-break.

## How to play

1. Press **Start raking**. Study the holes while the rake does its first pass.
2. Hold **Add sand**. Sand streams onto the hopper spot for as long as you hold and piles up as a cone with the same slope as the holes, so you can compare volumes by eye. If the bar passes under the spout it carries away what has landed and the pile regrows behind it. Several holds stack into one bigger pile; each hold counts as a pour. Steep edges settle in small slides now and then.
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
node scripts/serve.mjs 8791
```

Sound is off by default; the toggle remembers your choice.

## Debug parameters

- `?seed=123` reproduces a garden.
- `?speed=20` runs the simulation 20× faster.
- `?debug=1` shows deficit, added sand, remaining deficit, carried sand and a conservation check.
- In the console, `__debug.pour(v)` drops `v` sand units at once, `__debug.deposit(v)` streams them like a hold, `__debug.sim.S.D` is the exact deficit.

## Tuning

The simulation between the `SIM BEGIN` and `SIM END` markers is DOM-free and can be extracted and run in Node to sweep constants. Key constants live in `CFG` at the top of the script. `deposit(dV)` pours a small amount as the game does while holding; `pour(V)` drops a whole cone at once; `relaxAll(n)` runs the slide rule over the whole grid.

## Credits

Background photo by [FWStudio](https://www.pexels.com/@fwstudio-33348) on Pexels.
