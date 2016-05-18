(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .controller('MenuAdminController', MenuAdminController);

  MenuAdminController.$inject = [
    '$location',
    '$mdDialog'
  ];

  function MenuAdminController($location,
                               $mdDialog) {
    var vm = this;
    vm.menuIconURL = 'assests/images/ic_apps_black_18px.svg';
    vm.usersIconURL = 'assests/images/ic_people_black_48px.svg';
    vm.facultiesIconURL = 'assests/images/ic_account_balance_black_24px.svg';
    vm.groupsIconURL = 'assests/images/ic_contacts_black_24px.svg';
    vm.testsIconURL = 'assests/images/ic_perm_media_black_24px.svg';
    vm.courseIconURL = 'assests/images/ic_account_balance_wallet_black_24px.svg';
    vm.subjectIconURL = 'assests/images/ic_school_black_24px.svg';
    vm.filesImageIconURL = 'assests/images/ic_collections_black_24px.svg';

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

    vm.goToCourse = function () {
      $location.path('/admin/course');
    };

    vm.goToSubject = function () {
      $location.path('/admin/subject');
    };

    vm.opendlFileUploadImage = function (ev) {
      $mdDialog.show({
        controller: 'dlFileUploadImageController',
        controllerAs: 'dlFileUploadImage',
        templateUrl: './component/dlFileUpload/image/dlFileUploadImage.html',
        targetEvent: ev,
        clickOutsideToClose: false
      });
    };
  }
})();
