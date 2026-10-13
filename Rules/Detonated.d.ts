import NuclearAttack from '../NuclearAttack';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
export declare class Detonated extends Rule<
  [Unit, Tile, NuclearAttack],
  void
> {}
export default Detonated;
