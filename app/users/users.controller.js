(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UsersController', UsersController);

  UsersController.$inject = [
    'UsersUtils'
  ];

  function UsersController(UsersUtils) {
    var vm = this;
    var countUsersInPage = 15;
    vm.isOpen = true;
    vm.managerUserIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.menuUserIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createUserIconURL = './assests/images/ic_person_add_black_24px.svg';
    vm.editUserIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeUserIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.filterUserIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.loading = true;

    getUser({ page: 1 });
    function getUser(params) {
      UsersUtils.getUsers(params.page)
          .then(function (ok) {
            vm.users = ok.data;
            vm.total = ok.total;
            vm.loading = false;
          });
    }

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / countUsersInPage);
      if ((page % countUsersInPage) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      getUser({ page: page });
    };

    vm.editUser = function (user) {
      console.log('edit', user);
    };

    vm.removeUser = function (user) {
      console.log('remove', user);
    };
  }
})();
