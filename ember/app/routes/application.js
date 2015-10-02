import Ember from 'ember';

export default Ember.Route.extend({

	actions : {
		flashMessage : function(message, status) {
			this.controllerFor('application').set('flashStatus', status);
			this.controllerFor('application').set('flashMessage', message);
		},
		invalidateSession: function() {
			var _this = this;
			this.get('session').invalidate();
		}
	}

});
