import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  trip: DS.belongsTo('trip'),
  payments: DS.hasMany('payment'),
  settlements: DS.hasMany('settlement', {
    inverse: 'payer'
  })
});
