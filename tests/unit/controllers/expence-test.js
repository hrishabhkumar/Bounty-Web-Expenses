import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:expence', 'Unit | Controller | expence', {
  // Specify the other units that are required for this test.
  needs: ['controller:expence', 'controller:person']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
