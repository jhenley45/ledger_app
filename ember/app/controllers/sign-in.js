import Ember from "ember";
var $ = Ember.$;

export default Ember.Controller.extend({

  actions: {
    login: function() {
      if (!this.get('identification')) {
        this.set('errorMessage', 'You must provide an email address');
      }
    }
  },

});
