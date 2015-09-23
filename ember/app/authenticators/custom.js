import Ember from "ember";
import Base from 'simple-auth/authenticators/base';

var $ = Ember.$;

var CustomAuthenticator = Base.extend({

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(credentials) {
    debugger
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        url: "/accounts/users/sign_in",
        type: "POST",
        data: { username: credentials.email, password: credentials.password }
      }).then(function(response) {
        if (response.error) {
          reject(response.error[0]);
        } else {
          resolve({
            token: response['token'],
            user_id: response['user_id']
          });
        }
      }, function(xhr, status, error) {
        // var response = JSON.parse(xhr.responseText);
        if (xhr.responseJSON && xhr.responseJSON.error) {
          error = xhr.responseJSON.error
        }
        Ember.run(function() {
          reject(error);
        });
      });
    });
  },

  invalidate: function() {
    // home of future session destroy method. Return an empty promise for now
  	return new Ember.RSVP.Promise(function(resolve) {
      $.ajax({
        url: "/accounts/users/sign_out",
        type: "DELETE"
      }).always(function() {
        resolve();
        // do a hard reload of page so that data store is cleared out.
        // https://github.com/emberjs/data/issues/235
        document.location.reload(true);
      });
    });
  }
});

export default CustomAuthenticator;
