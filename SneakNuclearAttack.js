"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SneakNuclearAttack = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const NuclearAttack_1 = require("./NuclearAttack");
// A `NuclearAttack` on a player the attacker is at peace with: `enemy()` is that player, as for a `SneakAttack`.
class SneakNuclearAttack extends NuclearAttack_1.default {
    constructor(from, to, unit, enemy, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        this._enemy = enemy;
        this.addKey('enemy');
    }
    enemy() {
        return this._enemy;
    }
}
exports.SneakNuclearAttack = SneakNuclearAttack;
exports.default = SneakNuclearAttack;
//# sourceMappingURL=SneakNuclearAttack.js.map