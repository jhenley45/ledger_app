import DS from 'ember-data';

export default DS.Model.extend({
  trip: DS.belongsTo('trip'),
});
