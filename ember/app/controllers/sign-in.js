import Ember from "ember";
var $ = Ember.$;

export default Ember.Controller.extend({

  actions: {
    login: function() {
      if (!this.get('identification')) {
        this.set('errorMessage', 'Email field cannot be empty');
      } else if (!this.get('password')) {
        this.set('errorMessage', 'Password field cannot be empty');
      }
    }
  },

});
