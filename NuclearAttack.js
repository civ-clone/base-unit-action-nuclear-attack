"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuclearAttack = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("@civ-clone/core-unit/Action");
const Detonated_1 = require("./Rules/Detonated");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
// A nuclear weapon detonates over `to`: there's no combat, and the weapon is always used up. `Moved` is processed first,
//  as an attack does, so a ruleset's rules for an attack (a peace treaty broken, contact made) run before the
//  `Detonated` rules, which decide what the detonation does.
class NuclearAttack extends Action_1.default {
    constructor(from, to, unit, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
    }
    perform() {
        const unit = this.unit();
        this.ruleRegistry().process(Moved_1.default, unit, this);
        this.ruleRegistry().process(Detonated_1.default, unit, this.to(), this);
        if (!unit.destroyed()) {
            unit.destroy(unit.player());
        }
    }
}
exports.NuclearAttack = NuclearAttack;
exports.default = NuclearAttack;
//# sourceMappingURL=NuclearAttack.js.map