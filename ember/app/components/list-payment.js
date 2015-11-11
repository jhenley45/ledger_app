import Ember from "ember";

export default Ember.ListPaymentComponent = Ember.Component.extend({

  mouseEnter : function() {
    this.set('showEditDelete', true);
  },

  mouseLeave : function() {
    this.set('showEditDelete', false);
  },
  actions : {
    toggleConfirmRemovePayment : function() {
      this.set('confirmRemove', !this.get('confirmRemove'));
    },
    removePayment: function() {
      this.sendAction("delete", this.get('payment').get('content'));
    }
  }

});
