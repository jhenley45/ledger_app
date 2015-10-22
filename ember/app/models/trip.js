import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  settlements: DS.hasMany('settlement'),
  isSettled: DS.attr('boolean'),
  users: DS.hasMany('user'),
  organizerId: DS.attr('number'),
  organizer: function() {
  	return this.get('users').findBy('id', String(this.get('organizerId')));
  }.property('organizerId'),
  usersWithoutOrganizer: function() {
  	var _this = this;
  	return this.get('users').filter(function(user) {
  		if (user.get('id') === String(_this.get('organizerId'))) {
  			return false;
  		} else {
  			return true;
  		}
  	});
  }.property('users.@each', 'organizer')
});
