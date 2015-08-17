import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  payments: DS.hasMany('payment'),
  members: DS.hasMany('member')
});
