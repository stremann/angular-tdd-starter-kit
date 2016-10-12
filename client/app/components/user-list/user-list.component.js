import template from './user-list.html';
import controller from './user-list.controller';
import './user-list.scss';

let userListComponent = {
  bindings: {
    users: '='
  },
  transclude: true,
  template,
  controller
};

export default userListComponent;
