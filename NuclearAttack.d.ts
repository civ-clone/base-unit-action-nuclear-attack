import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
export declare class NuclearAttack extends Action {
  constructor(from: Tile, to: Tile, unit: Unit, ruleRegistry?: RuleRegistry);
  perform(): void;
}
export default NuclearAttack;
