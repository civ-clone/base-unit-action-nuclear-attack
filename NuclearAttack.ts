import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Detonated from './Rules/Detonated';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

// A nuclear weapon detonates over `to`: there's no combat, and the weapon is always used up. `Moved` is processed first,
//  as an attack does, so a ruleset's rules for an attack (a peace treaty broken, contact made) run before the
//  `Detonated` rules, which decide what the detonation does.
export class NuclearAttack extends Action {
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);
  }

  perform(): void {
    const unit = this.unit();

    this.ruleRegistry().process(Moved, unit, this);

    this.ruleRegistry().process(Detonated, unit, this.to(), this);

    if (!unit.destroyed()) {
      unit.destroy(unit.player());
    }
  }
}

export default NuclearAttack;
