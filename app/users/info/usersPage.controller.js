(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = [
    '$log', '$location', '$routeParams', '$route',
    'UsersUtils', 'LoginUtils'
  ];

  function UserInfoController($log, $location, $routeParams, $route,
                              UsersUtils, LoginUtils) {
    var vm = this;
    vm.userSlug = $routeParams.slug;
    var slugForCreate = 'create';
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
      if (LoginUtils.isLogged()) {
        if ($routeParams.slug != slugForCreate) {
          getUserInfo($routeParams.slug);
        } else {
          vm.user = {};
          vm.loading = false;
        }
      } else {
        $location.path('/home');
      }
    }

    function getUserInfo(slug) {
      UsersUtils.getUserBySlug(slug)
          .then(function (ok) {
            vm.user = prepareUserToShow(ok);

            vm.loading = false;
          }, function (err) {
            var user = LoginUtils.reLogin();
            LoginUtils.login(user)
                .then(function (ok) {
                  var path = '/admin/users/' + slug;
                  $location.path(path);

                  $route.reload();
                }, function (err) {
                  $log.log('[ERROR] LoginUtils.reLogin()()', err);
                });
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
      }

      return user;
    }

    function createUser(user) {
      UsersUtils.createUser(user)
          .then(function () {
            $location.path('/profile');
          }, function (err) {
            $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);
            var user = LoginUtils.reLogin();
            LoginUtils.login(user)
                .then(function (ok) {
                  var path = '/admin/users';
                  $location.path(path);

                  $route.reload();
                }, function (err) {
                  $log.log('[ERROR] LoginUtils.reLogin()()', err);
                });
          });
    }

    function editUser(user) {
      UsersUtils.changeUser(user)
          .then(function () {
            vm.loading = false;

            $location.path('/profile');
          }, function (err) {
            $log.log('[ERROR] UsersController.editUserSave().UsersUtils.changeUser()', err);
            var user = LoginUtils.reLogin();
            LoginUtils.login(user)
                .then(function (ok) {
                  var path = '/admin/users';
                  $location.path(path);

                  $route.reload();
                }, function (err) {
                  $log.log('[ERROR] LoginUtils.reLogin()()', err);
                });
          });
    }

    function goLogin(err) {
      var path = '/admin/users/';
      $location.path(path);

      $route.reload();
    }

    vm.saveUser = function () {
      vm.loading = true;

      if ($routeParams.slug == slugForCreate) {
        createUser(prepareUserToSave(vm.user));
      } else {
        editUser(prepareUserToSave(vm.user));
      }
    };

    vm.calcelUser = function () {
      $location.path('/profile/admin');
    };
  }
})();
