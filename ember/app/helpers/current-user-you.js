import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(user, currentUser) {
  if (user) {
    if (user.get('id') === currentUser.get('id')) {
      return 'You';
    } else {
      return user.get('username');
    }
  }
});
