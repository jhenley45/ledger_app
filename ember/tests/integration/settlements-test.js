import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Settlement Sidebar', {
  beforeEach: function() {
    App = startApp();
    signIn().then(function() {
      visit('/trips/2');
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should show the Trip Summary sidebar when there are settlements', function(assert) {
  assert.equal(find('div.section-title:contains("Trip Summary")').length, 1);
});


test('Should NOT show the Trip Summary sidebar when there are no settlements', function(assert) {
  visit('/trips/1').then(function() {
    assert.equal(find('div.section-title:contains("Trip Summary")').length, 0);
  })
});

test('Should show a list of all settlements', function(assert) {
  assert.equal(find('div.settlement').length, 4);
});
