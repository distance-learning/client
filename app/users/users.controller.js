(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UsersController', UsersController);

  UsersController.$inject = [
    '$mdSidenav', '$log', '$mdDialog', '$location',
    'UsersUtils', 'LoginUtils'
  ];

  function UsersController($mdSidenav, $log, $mdDialog, $location,
                           UsersUtils, LoginUtils) {
    var vm = this;
    var countUsersInPage = 15;
    var sideNavName = 'editUserContainer';
    vm.isOpen = true;
    vm.managerUserIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.menuUserIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createUserIconURL = './assests/images/ic_person_add_black_24px.svg';
    vm.editUserIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeUserIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.filterUserIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.loading = true;
    vm.editebleUser = {};
    vm.params = { page: 1 };
    vm.role = [
      { name: 'Адміністратор', role: 'administrator' },
      { name: 'Викладач', role: 'teacher' },
      { name: 'Студент', role: 'student' }
    ];

    getUser(vm.params);
    function getUser(params) {
      debugger;
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

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / countUsersInPage);
      if ((page % countUsersInPage) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;
      getUser(vm.params);
    };

    vm.editUser = function (user) {
      vm.editebleUser = user;
      if (vm.editebleUser.birthday) {
        vm.editebleUser.birthday = new Date(vm.editebleUser.birthday);
      } else {
        delete vm.editebleUser.birthday;
      }

      for(var i in vm.role) {
        if (vm.role[i].role == vm.editebleUser.role) {
          vm.editebleUser.role = vm.role[i].name;
        }
      }

      $mdSidenav(sideNavName).toggle();
    };

    vm.editUserSave = function () {
      if (vm.editebleUser.selectedUserRole) {
        vm.editebleUser.role = vm.editebleUser.selectedUserRole.role;
      }

      if (vm.editebleUser.create) {
        UsersUtils.createUser(vm.editebleUser)
            .then(function (ok) {
              getUser(vm.params);
              $mdSidenav(sideNavName).close();
            }, function (err) {
              $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);
              goLogin(err);
            });

      } else {
        UsersUtils.changeUser(vm.editebleUser)
            .then(function (ok) {
              getUser(vm.params);
              $mdSidenav(sideNavName).close();
            }, function (err) {
              $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);
              goLogin(err);
            });
      }
    };

    vm.editUserCancel = function () {
      $mdSidenav(sideNavName).close();
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
            .then(function (ok) {
              getUser(vm.params);
            }, function (err) {
              $log.log('[ERROR] UsersController.removeUser().UsersUtils.deleteUser()', err);
              goLogin(err);
            });
      });
    };

    vm.createUser = function () {
      vm.editebleUser = {};
      vm.editebleUser.create = true;

      $mdSidenav(sideNavName).toggle();
    };

    function goLogin(err) {
      LoginUtils.logout();
      $location.path('/login');
    }
  }
})();
