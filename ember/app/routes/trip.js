import Ember from 'ember';

export default Ember.Route.extend({
	// Using setupController here instead of model hook because we always want to query our API
	// when we enter this route, as we need to fetch the payments for each trip.
	// If we use the model hook, API will not be called if we transition using a link-to.
	// Using store.fetch ensures that API is called even if trip is already in the store.
  setupController : function(controller, model) {
  	var _this = controller;
  	this.store.fetch('trip', model.get('id')).then(function(data) {
  		_this.set('model', data)
  	})
  }
});
