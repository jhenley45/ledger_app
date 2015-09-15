import Ember from "ember";

export default Ember.Controller.extend({

  actions: {
    createUser : function() {
      var email;

      email = this.get('email');

      if (!email) {
        this.set('emailError', 'You must provide an email address');
      }
    }
  },


});
