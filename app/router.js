import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('trips', function() {
		this.route('show', {path: ':trip_id'});
	});
});

export default Router;
