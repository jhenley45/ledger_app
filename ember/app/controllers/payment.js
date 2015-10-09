import Ember from "ember";

export default Ember.ObjectController.extend({
  actions : {
    toggleConfirmRemovePayment: function() {
      this.set('confirmRemove', !this.get('confirmRemove'));
    },
    showEditPayment : function() {
      this.set('isEditing', true);
    },
  },
  belongsToCurrentUser: function() {
    return this.get('user').get('id') === this.get('session').get('currentUser').get('id');
  }.property('user', 'session.currentUser')
});
