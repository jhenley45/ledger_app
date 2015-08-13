import Ember from "ember";

export default Ember.ObjectController.extend({

	actions: {
		toggleForm: function() {
			this.set('showNewPaymentForm', !this.get('showNewPaymentForm'))
		}
	}
});
