import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Sign up', {
  beforeEach: function() {
    App = startApp();
    visit('/');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

var createAccountText = "Create Account";

test('Should have a sign up link in the navbar', function(assert) {
  assert.equal(find('#sign-up').text(), 'Sign up');
});

test('Sign up link should take user to sign up route', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('h2').text(), 'Create Account');
  });
});

test('Sign up page should have an input box for email address', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign up page should have an input box for password', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign up page should have an input box for repeat password', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#repeat-password').length, 1);
  });
});

test('Should have a submit button with ' + createAccountText, function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('button:contains(' + createAccountText + ')').length, 1);
  });
});

test('Should show an error message when the user submits an empty form', function(assert) {
  click(find('#sign-up')).then(function() {
    click(find('button:contains(' + createAccountText + ')')).then(function() {
      assert.equal(find('p:contains("You must provide an email address")').length, 1);
    })
  });
});

test('Should show an error message when the user submits an invalid email address', function(assert) {
  click(find('#sign-up')).then(function() {
    fillIn(find('input#email'), 'something').then(function() {
      click(find('button:contains(' + createAccountText + ')')).then(function() {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      })
    })
  });
});

test('Should show an error message when the user submits an invalid email address', function(assert) {
  click(find('#sign-up')).then(function() {
    fillIn(find('input#email'), '@aol.com').then(function() {
      click(find('button:contains(' + createAccountText + ')')).then(function() {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      })
    })
  });
});

test('Should show an error message when the user submits an invalid email address', function(assert) {
  click(find('#sign-up')).then(function() {
    fillIn(find('input#email'), 'something@else.').then(function() {
      click(find('button:contains(' + createAccountText + ')')).then(function() {
        assert.equal(find('p:contains("You must provide a valid email address")').length, 1);
      })
    })
  });
});

test('Should clear the error if the user corrects an invalid email address', function(assert) {
  click(find('#sign-up')).then(function() {
    fillIn(find('input#email'), 'something@else.').then(function() {
      click(find('button:contains(' + createAccountText + ')')).then(function() {
        fillIn(find('input#email'), 'something@else.com').then(function() {
          click(find('button:contains(' + createAccountText + ')')).then(function() {
            assert.equal(find('p:contains("You must provide a valid email address")').length, 0);
          })
        })
      })
    })
  });
});

test('Should clear the error if the user corrects an empty email address', function(assert) {
  click(find('#sign-up')).then(function() {
    fillIn(find('input#email'), '').then(function() {
      click(find('button:contains(' + createAccountText + ')')).then(function() {
        fillIn(find('input#email'), 'something@else.com').then(function() {
          click(find('button:contains(' + createAccountText + ')')).then(function() {
            assert.equal(find('p:contains("You must provide an email address")').length, 0);
          })
        })
      })
    })
  });
});
