# base-unit-action-nuclear-attack

The `NuclearAttack` unit action: a nuclear weapon detonates over its target (civ-clone/web-renderer#129). There's no
combat roll, and the weapon is always used up.

- `NuclearAttack`: `new NuclearAttack(from, to, unit, ruleRegistry)`. Its `perform` processes `Moved` (as an attack
  does, so the ruleset's rules for an attack run first), then the `Detonated` rules, then destroys the unit if those
  rules haven't.
- `SneakNuclearAttack`: the same, against a player the attacker is at peace with, as `enemy()`.
- `Rules/Detonated`: `Rule<[Unit, Tile, NuclearAttack], void>`. What the detonation does is up to the ruleset. Civ1's
  rules are in [`civ1-unit`](https://github.com/civ-clone/civ1-unit).
