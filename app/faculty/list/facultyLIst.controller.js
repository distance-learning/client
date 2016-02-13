(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .controller('FacultyListController', FacultyListController);

  FacultyListController.$inject = [
    '$log', '$location', '$mdDialog',
    'FacultyListUtils'
  ];

  function FacultyListController($log, $location, $mdDialog,
                                 FacultyListUtils) {
    var vm = this;
    vm.isOpen = true;
    vm.loading = true;
    vm.managerFacultyIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.menuFacultyIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createFacultyIconURL = './assests/images/ic_person_add_black_24px.svg';
    vm.editFacultyIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeFacultyIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.filterFacultyIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.params = {
      page: 1,
      count: 10
    };

    init();
    function init() {
      vm.loading = true;

      getFaculties(vm.params);
    }

    function getFaculties(params) {
      vm.loading = true;

      FacultyListUtils.getAdminFaculties(params)
          .then(function (ok) {
            vm.faculties = ok.data.data;
            vm.total = ok.data.total;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] FacultyListController.init()FacultyListUtils.getFaculties()', err);
          })
    }

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getFaculties(vm.params);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / vm.params.count);
      if ((page % vm.params.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.removeFaculty = function (ev, faculty) {
      $mdDialog.show({
        controller: 'FacultyListDialogController',
        controllerAs: 'facultyListDialog',
        templateUrl: 'dialogs/remove/notification.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          faculty: faculty
        }
      }).then(function (req) {
        FacultyListUtils.removeAdminFaculty(faculty)
            .then(function () {
              getFaculties(vm.params);
            }, function (err) {
              $log.log('[ERROR] FacultyListController.removeFaculty().FacultyListUtils.removeAdminFaculty()', err);
            });
      });
    };
  }
})();
