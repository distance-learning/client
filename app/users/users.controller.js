(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UsersController', UsersController);

  UsersController.$inject = [
    '$log', '$mdDialog', '$location',
    'UsersUtils', 'LoginUtils', 'ProfileUtils'
  ];

  function UsersController($log, $mdDialog, $location,
                           UsersUtils, LoginUtils, ProfileUtils) {
    var vm = this;
    var countUsersInPage = 10;
    vm.isOpen = true;
    vm.managerUserIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.menuUserIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createUserIconURL = './assests/images/ic_person_add_black_24px.svg';
    vm.editUserIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeUserIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.filterUserIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.loading = true;
    vm.params = { page: 1 };

    init();
    function init() {
      vm.loading = true;
      if (LoginUtils.isLogged()) {
        ProfileUtils.getUserInfo()
            .then(function (ok) {
              if (ok.role != 'admin') { return $location.path('/home'); }

              getUsers(vm.params);
            }, function (err) {
              $log.log('UsersController.init()', err);

              return $location.path('/home');
            });
      } else {
        return $location.path('/home');
      }
    }

    function getUsers(params) {
      vm.loading = true;

      UsersUtils.getUsers(params.page)
          .then(function (ok) {
            vm.users = ok.data;
            vm.total = ok.total;

            vm.loading = false;
          }, function (err) {
            debugger;
            $log.log('[ERROR] getUser()', err);
            goLogin(err);
          });
    }

    function goLogin(err) {
      LoginUtils.logout();

      $location.path('/login');
    }

    vm.createUser = function () {
      var path = '/admin/users/info/create';

      $location.path(path);
    };

    vm.editUser = function (user) {
      var path = '/admin/users/info/' + user.slug;

      $location.path(path);
    };

    vm.removeUser = function (ev, user) {
      $mdDialog.show({
        controller: 'UsersDialogController',
        controllerAs: 'userDialog',
        templateUrl: './users/dialog/notification.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          user: user
        }
      }).then(function (req) {
        UsersUtils.deleteUser(user)
            .then(function () {

              getUsers(vm.params);
            }, function (err) {
              $log.log('[ERROR] UsersController.removeUser().UsersUtils.deleteUser()', err);
              goLogin(err);
            });
      });
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getUsers(vm.params);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / countUsersInPage);
      if ((page % countUsersInPage) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };
  }
})();
