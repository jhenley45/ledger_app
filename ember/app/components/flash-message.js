import Ember from "ember";

export default Ember.FlashMessageComponent = Ember.Component.extend({
  classNameBindings: ['setClass'],
  setClass: function() {
    return "flash-" + this.get('flash').get('type');
  }.property('flash.type'),

  didInsertElement: function() {
  	var time = 3000;
  	var _this = this;
    // this.$().fadeOut(time);
    //
    // Ember.run.later(_this, function() {
    //   _this.set('flashMessage', undefined);
    // }, time);
  }
});
