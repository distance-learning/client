(function () {
  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseInfoController', CourseInfoController);

  CourseInfoController.$inject = [
    '$log', '$location', '$routeParams',
    'CourseUtils', 'LoginUtils'
  ];

  function CourseInfoController($log, $location, $routeParams,
                                CourseUtils, LoginUtils) {
    var vm = this;
    vm.courseSlug = $routeParams.slug;
    vm.course = {};
    vm.loading = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if (vm.courseSlug) { return getCourseInfo(vm.courseSlug); }

      vm.course = {};
      vm.loading = false;
    }

    function getCourseInfo(slug) {
      vm.loading = true;

      // TODO: fix
      CourseUtils.getCourse(slug)
          .then(function (ok) {
            vm.user = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] CourseInfoController.CourseUtils.getCourse()', err);
          });
    }

    function createCourse(course) {

      // TODO: fix
      CourseUtils.createCourse(course)
          .then(function () {
            $location.path('/admin/course');
          }, function (err) {
            $log.log('[ERROR] CourseController.CourseUtils.createCourse()', err);
          });
    }

    function editCourse(course) {

      // TODO: fix
      CourseUtils.updateCourse(course)
          .then(function () {
            vm.loading = false;

            $location.path('/admin/course');
          }, function (err) {
            $log.log('[ERROR] UsersController.CourseUtils.updateCourse()', err);
          });
    }

    vm.saveCourse = function () {
      vm.loading = true;

      if (!vm.courseSlug) {
        createCourse(vm.course);
      } else {
        editCourse(vm.course);
      }
    };

    vm.cancelCourse = function () {
      $location.path('/admin/course');
    };
  }
})();
