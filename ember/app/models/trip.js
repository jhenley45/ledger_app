import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  members: DS.hasMany('member'),
  organizer_id: DS.attr('number'),
  organizer: function() {
  	return this.get('members').findBy('id', String(this.get('organizer_id')));
  }.property('organizer_id'),
  membersWithoutOrganizer: function() {
  	var _this = this;
  	return this.get('members').filter(function(member) {
  		if (member.get('id') === _this.get('organizer').get('id')) {
  			return false;
  		} else {
  			return true;
  		}
  	});
  }.property('members.@each', 'organizer')
});
