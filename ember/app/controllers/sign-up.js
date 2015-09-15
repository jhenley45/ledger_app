import Ember from "ember";
var $ = Ember.$;

export default Ember.Controller.extend({

  actions: {
    createUser : function() {
      var email, password, passwordConfirmation;

      email = this.get('email');
      password = this.get('password');
      passwordConfirmation = this.get('passwordConfirmation');

      // clear any pre-existing errors
      this.set('emailError', undefined);
      this.set('passwordError', undefined);
      this.set('passwordConfirmationError', undefined);

      if (!email) {
        this.set('emailError', 'You must provide an email address');
      } else if (!this.emailValidation(email)) {
        this.set('emailError', 'You must provide a valid email address');
      } else if (!password) {
        this.set('passwordError', 'You must provide a password');
      } else if (!passwordConfirmation) {
        this.set('passwordConfirmationError', 'You must provide a confirmation password');
      } else if (password !== passwordConfirmation) {
        this.set('passwordError', 'Your passwords do not match');
        this.set('passwordConfirmationError', 'Your passwords do not match');
      } else {
        var _this = this;

        $.ajax({
          url: "/api/users",
          type: "POST",
          data: { email: email, password: password }
        }).then(function(response) {
          Ember.run(function() {
            if (response.user) {
              _this.set('showVenmoConnect', true);
            }
          });
        }, function() {
          // handle error
        });
      }
    }
  },

  emailValidation : function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


});
