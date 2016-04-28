(function () {
  'use strict';

  angular
      .module('distanceLearning.subject')
      .controller('SubjectInfoController', SubjectInfoController);

  SubjectInfoController.$inject = [
    '$log', '$location', '$routeParams',
    'SubjectUtils', 'LoginUtils', 'FacultyListUtils', 'TeacherUtils'
  ];

  function SubjectInfoController($log, $location, $routeParams,
                                 SubjectUtils, LoginUtils, FacultyListUtils, TeacherUtils) {
    var vm = this;
    vm.subjectSlug = $routeParams.slug;
    vm.teachers = [];
    vm.facultyDirection = {};
    vm.facultyDirectionParams = {
      page: 1,
      count: 10
    };
    vm.teacherParams = {
      count: 10,
      page: 1
    };
    vm.subject= {
      faculty: {
        name: 'Пертягніть факультет'
      },
      teacher: {
        name: 'Пертягніть викладача'
      }
    };
    vm.loading = true;
    vm.loadingTeachers = true;
    vm.loadingFacultyDirection = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if ($routeParams.slug) { return getSubjectInfo($routeParams.slug); }

      getTeachers();
      getFacultyDirection();

      vm.subject= {
        faculty: {
          name: 'Пертягніть факультет'
        },
        teacher: {
          name: 'Пертягніть викладача'
        },
        name: 'Введіть назву предмету'
      };
      vm.loading = false;
    }

    function getTeachers() {
      vm.loadingTeachers = true;

      TeacherUtils.getTeachers()
          .then(function (ok) {
            vm.teachers = ok.data;

            vm.loadingTeachers = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getTeachers().TeacherUtils.getTeachers()', err);
          });
    }

    function getFacultyDirection() {
      vm.loadingFacultyDirection = true;

      FacultyListUtils.getFaculties(vm.facultyDirectionParams)
          .then(function (ok) {
            vm.facultyDirection.data = ok.data.data;
            vm.facultyDirection.total= ok.data.total;

            console.log(vm.facultyDirection);

            vm.loadingFacultyDirection = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getFacultyDirection().FacultyListUtils.getFaculties()', err);
          });

    }

    function getSubjectInfo(slug) {
      vm.loading = true;

      SubjectUtils.getSubject(slug)
          .then(function (ok) {
            vm.subject = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getSubjectInfo().SubjectUtils.getSubject()', err);
          });
    }

    function createSubject(subject) {
      SubjectUtils.createSubject(subject)
          .then(function () {
            $location.path('/admin/subject');
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.createSubject().SubjectUtils.createSubject()', err);
          });
    }

    function editSubject(subject) {
      SubjectUtils.updateSubject(subject)
          .then(function () {
            vm.loading = false;

            $location.path('/admin/subject');
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.editUserSave().SubjectUtils.updateSubject()', err);
          });
    }

    vm.saveUser = function () {
      vm.loading = true;

      if (!$routeParams.slug) {
        createSubject(vm.subject);
      } else {
        editSubject(vm.subject);
      }
    };

    vm.cancelSubject = function () {
      $location.path('/admin/subject');
    };

    vm.jumpToFacultyPage = function (page) {
      vm.facultyDirectionParams.page = page;

      getFacultyDirection(vm.facultyDirectionParams);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / vm.facultyDirectionParams.count);
      if ((page % vm.facultyDirectionParams.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.onDropComplete = function (data, event) {
      if (data.type == 'faculty') vm.subject.faculty = data.faculty;
      if (data.type == 'teacher') vm.subject.teacher = data.teacher;
    };

    vm.cancelSubject = function () {
      $location.path('/admin/subject');
    };

    vm.saveSubject = function () {
      console.log('save subject', vm.subject);
      $location.path('/admin/subject');
    };
  }
})();
