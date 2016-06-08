(function () {
  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseInfoController', CourseInfoController);

  CourseInfoController.$inject = [
    '$log', '$location', '$routeParams',
    'CourseUtils', 'LoginUtils', 'FacultyListUtils',
    'TeacherUtils', 'SubjectUtils', 'GroupUtils'
  ];

  function CourseInfoController($log, $location, $routeParams,
                                CourseUtils, LoginUtils, FacultyListUtils,
                                TeacherUtils, SubjectUtils, GroupUtils) {
    var vm = this;
    vm.courseSlug = $routeParams.slug;
    vm.teachers = [];
    vm.subjects = [];
    vm.groups = [];
    vm.subjectsParams = {
      page: 1,
      count: 5
    };
    vm.groupsParams = {
      page: 1,
      count: 5
    };
    vm.teacherParams = {
      page: 1,
      count: 5
    };
    vm.course = {
      group: {
        name: 'Пертягніть групу'
      },
      teacher: {
        name: 'Пертягніть викладача'
      },
      subject: {
        name: 'Пертягніть предмет'
      },
      is_active: true
    };
    vm.loading = true;
    vm.loadingTeachers = true;
    vm.loadingGroups = true;
    vm.loadingSubjects = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if ($routeParams.slug) { getCourseInfo($routeParams.slug); }

      getTeachers();
      getSubjects();
      getGroups();

      vm.loading = false;
    }

    function getTeachers() {
      vm.loadingTeachers = true;

      TeacherUtils.getTeacherWithOutRandom(vm.teacherParams)
          .then(function (ok) {
            vm.teachers.data = ok.data;
            vm.teachers.total = ok.total;

            vm.loadingTeachers = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getTeachers().TeacherUtils.getTeachers()', err);
          });
    }

    function getGroups(){
      vm.loadingGroups = true;

      GroupUtils.getGroupsWithoutDirection(vm.groupsParams)
          .then(function (ok) {
            vm.groups.data = ok.data;
            vm.groups.total= ok.total;

            vm.loadingGroups = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getGroups().GroupUtils.getGroupsWithoutDirection()', err);
          });
    }

    function getSubjects() {
      vm.loadingSubjects = true;

      SubjectUtils.getSubjects(vm.subjectsParams)
          .then(function (ok) {
            vm.subjects.data = ok.data;
            vm.subjects.total = ok.total;

            vm.loadingSubjects = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getFacultyDirection().FacultyListUtils.getFaculties()', err);
          });
    }

    function getCourseInfo(slug) {
      vm.loading = true;

      CourseUtils.getCourse(slug)
          .then(function (ok) {
            vm.course = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getSubjectInfo().SubjectUtils.getSubject()', err);
          });
    }

    function createCourse(subject) {
      CourseUtils.createCourse(subject)
          .then(function () {
            $location.path('/admin/subject');
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.createSubject().SubjectUtils.createSubject()', err);
          });
    }

    function editSubject(subject) {
      CourseUtils.updateSubject(subject)
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
        createCourse(vm.course);
      } else {
        editSubject(vm.course);
      }
    };

    vm.cancelCourse = function () {
      $location.path('/admin/subject');
    };

    vm.jumpToSubjectPage = function (page) {
      vm.subjectsParams.page = page;

      getSubjects(vm.subjectsParams);
    };

    vm.jumpToGroupPage = function (page) {
      vm.groupsParams.page = page;

      getGroups(vm.groupsParams);
    };

    vm.jumpToTeacherPage = function (page) {
      vm.teacherParams.page = page;

      getTeachers(vm.teacherParams);
    };

    vm.range = function (page) {
      if (!page) {
        return new Array(1);
      }

      var countPage = Math.floor(page / vm.subjectsParams.count);
      if ((page % vm.subjectsParams.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.onDropComplete = function (data, event) {
      if (data.type == 'subject') vm.course.subject = data.subject;
      if (data.type == 'teacher') vm.course.teacher = data.teacher;
      if (data.type == 'group') vm.course.group = data.group;
    };

    vm.cancelCourse = function () {
      $location.path('/admin/course');
    };

    vm.saveCourse = function () {
      vm.loading = true;
      if (!vm.courseSlug) {
        CourseUtils.createCourse(vm.course)
            .then(function (ok) {
              $location.path('/admin/course');
            }, function (err) {
              $log.log('[ERROR] SubjectInfoController.saveCourse(). CourseUtils.createCourse()', err);
            });
      } else {
        CourseUtils.updateCourse(vm.course)
            .then(function (ok) {
              $location.path('/admin/course');
            }, function (err) {
              $log.log('[ERROR] SubjectInfoController.saveCourse(). CourseUtils.updateCourse()', err);
            });
      }

    };
  }
})();
