import Ember from "ember";

export default Ember.Controller.extend({

  actions: {
    createUser : function() {
      var email, password;

      email = this.get('email');
      password = this.get('password');

      // clear any pre-existing errors
      this.set('emailError', undefined);
      this.set('passwordError', undefined);

      if (!email) {
        this.set('emailError', 'You must provide an email address');
      } else if (!this.emailValidation(email)) {
        this.set('emailError', 'You must provide a valid email address');
      } else if (!password) {
        this.set('passwordError', 'You must provide a password');
      }
    }
  },

  emailValidation : function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


});
