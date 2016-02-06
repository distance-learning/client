(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileChangeInfoController', ProfileChangeInfoController);

  ProfileChangeInfoController.$inject = [
    '$location', '$log', '$mdToast',
    'ProfileUtils', 'LoginUtils'
  ];

  function ProfileChangeInfoController($location, $log, $mdToast,
                                       ProfileUtils, LoginUtils) {
    var vm = this;
    vm.loading = true;
    vm.user = {};

    init();
    function init() {
      vm.loading = true;

      if (!LoginUtils.isLogged()) {
        return $location.path('/home');
      }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = prepareToShow(ok);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileChangeInfoController.init().ProfileUtils.getUserInfo()', err);
          });
    }

    function prepareToShow(user) {
      if (!user.birthday) {
        user.birthday = null;
        return user;
      }

      var date = user.birthday.split('-');
      user.birthday = new Date(date[0], date[1], date[2]);

      return user;
    }

    function prepareToSave(value) {
      if (!value) { return value; }

      value = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate();

      return value;
    }

    vm.cancel = function () {
      $location.path('/home');
    };

    vm.changeInformation = function(user) {
      var value  = {
        name: user.name,
        surname: user.surname,
        birthday: prepareToSave(user.birthday),
        email: user.email,
        phone: user.phone
      };

      ProfileUtils.changeInfo(value)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Information was change')
                    .hideDelay(3000)
            );
            $location.path('/home');
          }, function (err) {
            $log.log('[ERROR] ProfileChangeInfoController.changeInformation().ProfileUtils.changeInfo()', err);
          });
    };
  }
})();