import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  members: DS.hasMany('member'),
  organizerId: DS.attr('number'),
  organizer: function() {
  	return this.get('members').findBy('id', String(this.get('organizerId')));
  }.property('organizerId'),
  membersWithoutOrganizer: function() {
  	var _this = this;
  	return this.get('members').filter(function(member) {
  		if (member.get('id') === String(_this.get('organizerId'))) {
  			return false;
  		} else {
  			return true;
  		}
  	});
  }.property('members.@each', 'organizer')
});
