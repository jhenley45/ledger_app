import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-up');
	this.resource('trips', {path: '/trips'}, function() {
		this.resource('trip', {path: '/:trip_id'}, function() {

		});
		this.route('new');
	});
});

export default Router;
