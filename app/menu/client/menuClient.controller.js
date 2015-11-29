(function () {
  'use strict';

  angular
      .module('distanceLearning.menuClient')
      .controller('MenuClientController', MenuClientController);

  MenuClientController.$inject = ['$mdSidenav'];

  function MenuClientController ($mdSidenav) {
    var vm = this;
    vm.menuIconURL = 'assests/images/ic_apps_black_18px.svg';

    vm.toggle = function () {
      $mdSidenav('menu-client').toggle();
    }
  }
})();
