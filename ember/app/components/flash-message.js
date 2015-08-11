import Ember from "ember";

export default Ember.FlashMessageComponent = Ember.Component.extend({
  didInsertElement: function() {
  	var time = 3000;
  	var _this = this;
    this.$().fadeOut(time);

    Ember.run.later(_this, function() {
      _this.get('parentView').get('controller').set('flashMessage', undefined);
    }, time);
  }
});
