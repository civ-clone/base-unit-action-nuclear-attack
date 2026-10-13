import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import NuclearAttack from './NuclearAttack';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

// A `NuclearAttack` on a player the attacker is at peace with: `enemy()` is that player, as for a `SneakAttack`.
export class SneakNuclearAttack extends NuclearAttack {
  private _enemy: Player;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    enemy: Player,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this._enemy = enemy;

    this.addKey('enemy');
  }

  enemy(): Player {
    return this._enemy;
  }
}

export default SneakNuclearAttack;
