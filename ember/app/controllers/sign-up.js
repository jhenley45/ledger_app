import Ember from "ember";

export default Ember.Controller.extend({

  actions: {
    createUser : function() {
      var email;

      email = this.get('email');

      // clear any pre-existing errors
      this.set('emailError', undefined);

      if (!email) {
        this.set('emailError', 'You must provide an email address');
      } else if (!this.emailValidation(email)) {
        this.set('emailError', 'You must provide a valid email address');
      }
    }
  },

  emailValidation : function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


});
