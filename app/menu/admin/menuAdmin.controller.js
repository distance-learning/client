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
    vm.facultiesIconURL = 'assests/images/ic_account_balance_black_24px.svg';
    vm.groupsIconURL = 'assests/images/ic_contacts_black_24px.svg';
    vm.testsIconURL = 'assests/images/ic_perm_media_black_24px.svg';

    vm.goToUsers = function () {
      $location.path('/admin/users');
    };

    vm.goToFaculties = function () {
      $location.path('/admin/faculties');
    };

    vm.goToGroups = function () {
      $location.path('/admin/groups');
    };

    vm.goToTests = function () {
      $location.path('/admin/tests');
    };
  }
})();
