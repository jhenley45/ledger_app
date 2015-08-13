import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  amount: DS.attr('number'),
  trip: DS.belongsTo('trip')
});
