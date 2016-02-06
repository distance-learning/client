(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .controller('MenuClientController', MenuClientController);

  MenuClientController.$inject = [
    '$mdSidenav', '$location',
    'LoginUtils'
  ];

  function MenuClientController($mdSidenav, $location,
                                LoginUtils) {
    var vm = this;
    vm.menuIconURL = 'assests/images/ic_apps_black_18px.svg';
    vm.settingsIconURL = 'assests/images/ic_settings_black_24px.svg';
    vm.passwordIconURL = 'assests/images/ic_security_black_24px.svg';
    vm.changeInfoIconURL = 'assests/images/ic_assignment_ind_black_24px.svg';

    vm.toggle = function () {
      $mdSidenav('menu-client').toggle();
    };

    vm.resetPassword = function () {
      return $location.path('/profile/reset-password');
    };

    vm.isLogged = function () {
      return LoginUtils.isLogged();
    };

    vm.changeUSerInfo = function () {
      return $location.path('/profile/change-info');
    };
  }
})();
