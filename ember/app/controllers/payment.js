import Ember from "ember";

export default Ember.ObjectController.extend({
  actions : {
    toggleConfirmRemovePayment: function() {
      this.set('confirmRemove', !this.get('confirmRemove'));
    },
    showEditPayment : function() {
      this.set('isEditing', true);
    },
    updatePayment : function() {
      // clear any lingering form errors
			this.set('updatePaymentError', undefined);

			var _this = this;
			var amount = this.get('amount');

      if (!amount || amount.length < 1 || $.trim(amount) === "") {
				this.set('updatePaymentError', 'Amount field cannot be empty');
				return;
			} else if (isNaN(parseFloat(amount))) {
				this.set('updatePaymentError', 'Amount value must be a number');
				return;
			} else {
        this.get('model').save().then(function() {
          _this.send('flashMessage', 'Payment successfully updated', 'success');
          _this.set('isEditing', false);
        }, function() {
          _this.send('flashMessage', 'An error occurred while processing your request', 'warning');
        });
      }
    }
  },
  belongsToCurrentUser: function() {
    return this.get('user').get('id') === this.get('session').get('currentUser').get('id');
  }.property('user', 'session.currentUser')
});
