import Ember from "ember";
var $ = Ember.$;


export default Ember.Controller.extend({
  authenticator: 'authenticator:custom',

  actions: {
    login: function() {
      if (!this.get('identification')) {
        this.set('errorMessage', 'Email field cannot be empty');
      } else if (!this.get('password')) {
        this.set('errorMessage', 'Password field cannot be empty');
      } else {
        // all is well, call authenticate
        this.send('authenticate');
      }
    },

    authenticate: function() {
      var _this = this;
      var email = this.get('identification');
      var password = this.get('password');
      var credentials = { "email" : email, "password" : password };

      this.get('session').authenticate('authenticator:custom', credentials).then(function() {
        _this.transitionToRoute('index');
      }, function(message) {
        _this.set('errorMessage', message);
      })
    }
  },



});
