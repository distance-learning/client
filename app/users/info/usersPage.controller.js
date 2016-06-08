(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = [
    '$log', '$location', '$routeParams', '$rootScope',
    'UsersUtils', 'LoginUtils'
  ];

  function UserInfoController($log, $location, $routeParams, $rootScope,
                              UsersUtils, LoginUtils) {
    var vm = this;
    var slugForCreate = 'create';
    vm.userSlug = $routeParams.slug;
    vm.user = {};
    vm.loading = true;
    vm.role = [
      {name: 'Адміністратор', role: 'admin'},
      {name: 'Викладач', role: 'teacher'},
      {name: 'Студент', role: 'student'}
    ];

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if ($routeParams.slug != slugForCreate) { return getUserInfo($routeParams.slug); }

      vm.user = {};
      vm.loading = false;
    }

    function getUserInfo(slug) {
      vm.loading = true;
      
      UsersUtils.getUserBySlug(slug)
          .then(function (ok) {
            vm.user = prepareUserToShow(ok);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] LoginUtils.reLogin()()', err);
          });
    }

    function prepareUserToShow(user) {
      if (user.birthday) {
        user.birthday = new Date(user.birthday);
      } else {
        delete user.birthday;
      }

      for (var i in vm.role) {
        if (vm.role[i].role == user.role) {
          user.role = vm.role[i].name;
        }
      }

      return user;
    }

    function prepareUserToSave(user) {
      if (user.selectedUserRole) {
        user.role = user.selectedUserRole.role;
      } else {
        for (var i in vm.role) {
          if (vm.role[i].name == user.role) {
            user.role = vm.role[i].role;
          }
        }
      }

      return user;
    }

    function createUser(user) {
      UsersUtils.createUser(user)
          .then(function () {
            $location.path('/admin/users');
          }, function (err) {
            vm.loading = false;
            $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);

            for (var i in err) {
              if (angular.isArray(err[i])) {
                for (var j in err[i]) {
                  $rootScope.notification(err[i][j]);
                }
              } else
                $rootScope.notification(err[i]);
            }
          });
    }

    function editUser(user) {
      UsersUtils.changeUser(user)
          .then(function () {
            vm.loading = false;

            $location.path('/admin/users');
          }, function (err) {
            $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);
          });
    }

    vm.saveUser = function () {
      vm.loading = true;

      if ($routeParams.slug == slugForCreate) {
        createUser(prepareUserToSave(vm.user));
      } else {
        editUser(prepareUserToSave(vm.user));
      }
    };

    vm.cancelUser = function () {
      $location.path('/admin/users');
    };
  }
})();
