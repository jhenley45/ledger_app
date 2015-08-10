import Ember from "ember";

// Just use Controller not ObjectController
// http://stackoverflow.com/questions/16329233/emberjs-cross-controller-binding-failing-because-content-doesnt-exist-yet/16329411#16329411
export default Ember.Controller.extend({

	actions: {
		createTrip : function() {
			// clear any lingering form errors
			this.set('formError', undefined);

			var _this = this;
			var title = this.get('title');

			if (!title || title.length < 1) {
				this.set('formError', 'Title field cannot be empty');
				return;
			} else {
				var trip = this.store.createRecord('trip', {
					title: title
				});
				trip.save().then(function(trip) {
					_this.send('flashMessage', 'New trip successfully created', true);
					_this.transitionToRoute('trip', trip);
				}, function(error) {
					if (error.responseJSON && error.responseJSON.error) {
						_this.send('flashMessage', error.responseJSON.error, false);
					} else {
						_this.send('flashMessage', 'An error occurred while processing your request', false);
					}
				});
			}
		}
	}
});
