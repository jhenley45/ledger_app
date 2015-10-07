import Ember from "ember";

export default Ember.ObjectController.extend({
  actions : {
    promptRemovePayment: function(payment) {
      payment.set('confirmRemove', true);
    }
  },
  belongsToCurrentUser: function() {
    return this.get('user').get('id') === this.get('session').get('currentUser').get('id');
  }.property('user', 'session.currentUser')
});
