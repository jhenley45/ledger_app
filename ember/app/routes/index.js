import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel : function() {
    if (!this.get('session').isAuthenticated) {
      this.transitionTo('sign_in');
    }
  },
  model : function() {
    return this.store.find('trip');
  }
});
