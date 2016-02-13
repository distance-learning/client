(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .controller('FacultyPageInfoController', FacultyPageInfoController);

  FacultyPageInfoController.$inject = [
    '$routeParams', '$location', '$log',
    'LoginUtils', 'FacultyListUtils'
  ];

  function FacultyPageInfoController($routeParams, $location, $log,
                                     LoginUtils, FacultyListUtils) {
    var vm = this;
    var facultySlug = $routeParams.slug;
    vm.loading = true;
    vm.faculty = {};


    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      getFaculty(facultySlug);
    }

    function getFaculty(facultySlug) {
      vm.loading = true;
      FacultyListUtils.getFacultyBySlug(facultySlug)
          .then(function (ok) {
            vm.faculty = ok.data;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] FacultyPageInfoController.getFaculty().FacultyListUtils.getFacultyBySlug()', err);
          });
    }

    vm.cancelUpdateFaculty = function () {
      $location.path('/admin/faculties');
    };

    vm.saveFaculty = function() {
      FacultyListUtils.updateAdminFaculty(vm.faculty)
          .then(function () {
            $location.path('/admin/faculties');
          }, function (err) {
            $log.log('[ERROR] FacultyPageInfoController.saveFaculty().FacultyListUtils.updateAdminFaculty()', err);
          });
    };
  }
})();
