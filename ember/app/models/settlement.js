import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  trip: DS.belongsTo('trip'),
  payer: DS.belongsTo('user'),
  payee: DS.belongsTo('user')
});
