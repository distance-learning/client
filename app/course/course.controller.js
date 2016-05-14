(function () {

  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseController', CourseController);

  CourseController.$inject = [
    '$log', '$location',
    '$mdDialog',
    'CourseUtils', 'LoginUtils', 'ProfileUtils'
  ];

  function CourseController($log, $location,
                            $mdDialog,
                            CourseUtils, LoginUtils, ProfileUtils) {
    var vm = this;
    var countCoursesInPage = 15;
    vm.isOpen = true;
    vm.managerCourseIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.editCourseIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeCourseIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.menuCourseIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createCourseIconURL= './assests/images/ic_person_add_black_24px.svg';
    vm.filterCourseIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.loading = true;
    vm.courses = [];
    vm.params = { page: 1 };

    init();
    function init() {
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      vm.loading = true;

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            if (ok.role != 'admin') { return $location.path('/home'); }

            getCourses(vm.params);

          }, function (err) {
            $log.log('CourseController.init().ProfileUtils.getUserInfo()', err);

            return $location.path('/home');
          });
    }

    function getCourses(params) {
      vm.loading = true;

      CourseUtils.getCourses(params)
          .then(function (ok) {
            vm.courses = ok.data;
            vm.total = ok.total;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] CourseController.init().CourseUtils.getCourses()', err);
          });
    }

    vm.createCourse = function () {
      var path = '/admin/course/info';
      $location.path(path);
    };

    vm.editCourse = function (course) {
      var path = '/admin/course/info/' + course.id;
      $location.path(path);
    };

    vm.removeCourse = function (ev, course) {
      $mdDialog.show({
        controller: 'CourseDialogController',
        controllerAs: 'courseDialog',
        templateUrl: './course/dialog/notification.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          course: course
        }
      }).then(function () {
        CourseUtils.removeCourse(course)
            .then(function () {

              getCourses(vm.params);
            }, function (err) {
              $log.log('[ERROR] CourseController.removeCourse().CourseUtils.removeCourse()', err);
            });
      });
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getCourses(vm.params);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / countCoursesInPage);
      if ((page % countCoursesInPage) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };
  }
})();
