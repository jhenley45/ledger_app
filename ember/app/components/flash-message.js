import Ember from "ember";

export default Ember.FlashMessageComponent = Ember.Component.extend({
  didInsertElement: function() {
    this.$().fadeOut(3000);
  }
});
