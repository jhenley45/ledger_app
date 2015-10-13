import Ember from 'ember';
import flashObject from '../objects/flash'

export default Ember.Route.extend({

	actions : {
		flashMessage : function(message, type) {
			var flashMessage = flashObject.create({
				message: message,
				type: type
			});
			this.controllerFor('application').get('flashArray').pushObject(flashMessage);
		},
		invalidateSession: function() {
			var _this = this;
			this.get('session').invalidate().then(function() {
				_this.send('flashMessage', 'Successfully logged out', 'notice');
			});
		}
	}
});
