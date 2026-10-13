import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import NuclearAttack from './NuclearAttack';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
export declare class SneakNuclearAttack extends NuclearAttack {
  private _enemy;
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    enemy: Player,
    ruleRegistry?: RuleRegistry
  );
  enemy(): Player;
}
export default SneakNuclearAttack;
