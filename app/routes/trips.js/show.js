import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		this.store.find('trip', params.id);
	}
});
