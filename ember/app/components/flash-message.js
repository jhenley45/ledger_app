import Ember from "ember";

export default Ember.FlashMessageComponent = Ember.Component.extend({
  classNameBindings: ['setClass'],
  classNames: ['flash-message'],

  setClass: function() {
    return this.get('firstFlash').className;
  }.property('firstFlash'),

  firstFlash: function() {
    return this.get('flashArray').get('firstObject');
  }.property('flashArray.@each'),

  didInsertElement: function() {
  	var time = 3000;
  	var _this = this;
    this.$().fadeOut(time);

    Ember.run.later(_this, function() {
      _this.get('flashArray').shiftObject();
      if (this.get('flashArray').get('length')) {
      	_this.rerender();
      } else {
        _this.destroy();
      }
    }, time);
  }
});
