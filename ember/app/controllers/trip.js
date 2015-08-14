import Ember from "ember";

export default Ember.ObjectController.extend({

	needs: ["application"],

	applicationController: Ember.computed.alias('controllers.application'),

	actions: {
		toggleNewPaymentForm : function() {
			if (this.get('isTripRoute')) {
				this.transitionToRoute('payments.new');
			} else {
				this.transitionToRoute('trip');
			}
		}
	},

	isTripRoute : function() {
		return this.get('applicationController.currentRouteName') === 'trip.index' ? true : false;
	}.property('applicationController.currentRouteName'),

	newPaymentButtonText : function() {
		if (this.get('isTripRoute')) {
			return 'Add a new payment';
		} else {
			return 'Cancel';
		}
	}.property('isTripRoute')
});
