import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Home Page', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should say Ledger App', function(assert) {
  visit('/').then(function() {
    assert.equal(find('a.navbar-brand').text(), 'Ledger App');
  });
});
