import Ember from "ember";

export default Ember.ListPaymentComponent = Ember.Component.extend({

  mouseEnter : function() {
    this.set('showEditDelete', true);
  },

  mouseLeave : function() {
    this.set('showEditDelete', false);
  }
});
