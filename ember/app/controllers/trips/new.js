import Ember from "ember";

export default Ember.ObjectController.extend({

	actions: {
		createTrip : function() {
			// clear any lingering form errors
			this.set('formError', undefined);

			var title = this.get('model').get('title');

			if (!title || title.length < 1) {
				this.set('formError', 'Title field cannot be empty');
				return;
			}
		}
	}
});
