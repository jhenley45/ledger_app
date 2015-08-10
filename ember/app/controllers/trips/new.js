import Ember from "ember";

// Just use Controller not ObjectController
// http://stackoverflow.com/questions/16329233/emberjs-cross-controller-binding-failing-because-content-doesnt-exist-yet/16329411#16329411
export default Ember.Controller.extend({

	actions: {
		createTrip : function() {
			// clear any lingering form errors
			this.set('formError', undefined);

			var title = this.get('title');

			if (!title || title.length < 1) {
				this.set('formError', 'Title field cannot be empty');
				return;
			}
		}
	}
});
