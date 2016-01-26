(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .controller('MenuAdminController', MenuAdminController);

  MenuAdminController.$inject = [
    '$location'
  ];

  function MenuAdminController ($location) {
    var vm = this;
    vm.menuIconURL = 'assests/images/ic_apps_black_18px.svg';
    vm.usersIconURL = 'assests/images/ic_people_black_48px.svg';

    vm.goToUsers = function () {
      $location.path('/admin/users');
    };
  }
})();
