import Destroyed from '@civ-clone/core-unit/Rules/Destroyed';
import Detonated from '../Rules/Detonated';
import Effect from '@civ-clone/core-rule/Effect';
import Generator from '@civ-clone/core-world-generator/Generator';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import NuclearAttack from '../NuclearAttack';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import SneakNuclearAttack from '../SneakNuclearAttack';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
import World from '@civ-clone/core-world/World';
import { expect } from 'chai';

describe('NuclearAttack', (): void => {
  const world = new World(new Generator(1, 2)),
    from = new Tile(0, 0, new Terrain(), world),
    to = new Tile(1, 0, new Terrain(), world),
    setUp = () => {
      const ruleRegistry = new RuleRegistry(),
        calls: string[] = [];

      ruleRegistry.register(
        new Destroyed(
          new Effect((unit: Unit): void => {
            calls.push('Destroyed');

            unit.setDestroyed();
          })
        )
      );

      return {
        calls,
        ruleRegistry,
        unit: new Unit(null, new Player(), from, ruleRegistry),
      };
    };

  it('processes `Detonated` over the target, then `Moved`, then destroys the unit', (): void => {
    const { calls, ruleRegistry, unit } = setUp(),
      action = new NuclearAttack(from, to, unit, ruleRegistry);

    ruleRegistry.register(
      new Moved(new Effect((): void => void calls.push('Moved'))),
      new Detonated(
        new Effect((detonating: Unit, tile: Tile, by: NuclearAttack): void => {
          expect(detonating).to.equal(unit);
          expect(tile).to.equal(to);
          expect(by).to.equal(action);

          calls.push('Detonated');
        })
      )
    );

    action.perform();

    expect(calls).to.deep.equal(['Detonated', 'Moved', 'Destroyed']);
    expect(unit.destroyed()).to.true;
  });

  it("doesn't destroy the unit again when a `Detonated` rule already has", (): void => {
    const { calls, ruleRegistry, unit } = setUp();

    ruleRegistry.register(
      new Detonated(
        new Effect((detonating: Unit): void => detonating.destroy())
      )
    );

    new NuclearAttack(from, to, unit, ruleRegistry).perform();

    expect(calls).to.deep.equal(['Destroyed']);
  });

  it('is a `NuclearAttack` that carries the enemy when it breaks a peace treaty', (): void => {
    const { ruleRegistry, unit } = setUp(),
      enemy = new Player(),
      action = new SneakNuclearAttack(from, to, unit, enemy, ruleRegistry);

    expect(action).to.instanceOf(NuclearAttack);
    expect(action.enemy()).to.equal(enemy);
    expect(action.keys()).to.include('enemy');
  });
});
