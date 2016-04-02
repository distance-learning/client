(function () {
  'use strict';

  angular
      .module('distanceLearning.group')
      .controller('GroupController', GroupController);

  GroupController.$inject = [
    '$location', '$log', '$mdDialog',
    'LoginUtils', 'GroupUtils'
  ];

  function GroupController($location, $log, $mdDialog,
                           LoginUtils, GroupUtils) {
    var vm = this;
    vm.loading = true;
    vm.saveGroupIconURL = './assests/images/ic_save_black_24px.svg';
    vm.removeStudentIconURL = './assests/images/ic_remove_circle_black_18px.svg';
    vm.loadingStudents = true;

    init();
    function init() {
      vm.loading = true;
      vm.loadingStudents = true;
      vm.loadingGroups = true;
      vm.paramsStudents = { page: 1 };
      vm.paramsGroups = {
        page: 1,
        faculty: {},
        direction: {}
      };
      vm.group = {
        name: 'Назва групи',
        students: []
      };

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      GroupUtils.getFacultyInfo(vm.paramsStudents)
          .then(function (ok) {
            vm.faculties = ok;
            vm.directions = vm.faculties[0].directions;
            vm.group.faculty = vm.faculties[0];
            vm.group.faculty_id = vm.faculties[0].id;
            vm.group.direction = vm.faculties[0].directions[0];
            vm.group.direction_id = vm.faculties[0].directions[0].id;

            vm.paramsGroups.faculty = vm.faculties[0];
            vm.paramsGroups.direction = vm.faculties[0].directions[0];
            getGroups(vm.paramsGroups);

            GroupUtils.getStudents()
                .then(function (ok) {
                  vm.students = ok.data;

                  studentIsChecked(vm.students, vm.group.students);
                  vm.students.total = ok.total;

                  vm.loadingStudents = false;
                }, function (err) {
                  $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo().GroupUtils.getStudents()', err);
                });

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo()', err);
          });
    }

    function getStudents(params) {
      vm.loadingStudents = true;
      delete vm.students.total;

      GroupUtils.getStudents(params)
          .then(function (ok) {
            vm.students = ok.data;

            studentIsChecked(vm.students, vm.group.students);
            vm.students.total = ok.total;

            vm.loadingStudents = false;
          }, function (err) {
            $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo().GroupUtils.getStudents()', err);
          });
    }

    function getGroups(params) {
      vm.loadingGroups = true;

      GroupUtils.getGroups(params)
          .then(function (ok) {
            vm.groups = ok.data;
            vm.groups.total = ok.total;

            vm.loadingGroups = false;
          }, function (err) {
            $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo().GroupUtils.getStudents()', err);
          });
    }

    function studentIsChecked(students, group) {
      for(var i in students) {
        students[i].isChecked = false;

        for(var j in group) {
          if (students[i].id == group[j].id) { students[i].isChecked = true; }
        }
      }
    }

    vm.showFacultyDirections = function (faculty) {
      for (var i in vm.faculties) {
        if (vm.faculties[i].id == faculty.id) {
          vm.directions = vm.faculties[i].directions;

          vm.group.faculty = vm.faculties[i];
          vm.group.faculty_id = vm.faculties[i].id;
          vm.group.direction = vm.faculties[i].directions[0];
          vm.group.direction_id = vm.faculties[i].directions[0].id;

          vm.paramsGroups.faculty = vm.faculties[i];
          vm.paramsGroups.direction = vm.faculties[i].directions[0];

          getGroups(vm.paramsGroups);
        }
      }
    };

    vm.selectDirection = function (direction) {
      vm.group.direction = direction;
      vm.group.direction_id = direction.id;
      vm.paramsGroups.direction = direction;

      getGroups(vm.paramsGroups);
    };

    vm.editGroupName = function (newName) {
      if (!newName) { vm.group.name = 'Назва групи' }
      else { vm.group.name = newName; }
    };

    vm.checkedStudent = function (student) {
      var exist = true;

        for(var i in vm.group.students) {
          if (student.id == vm.group.students[i].id) {
            vm.group.students.splice(i, 1);
            exist = false;
          }
        }

      if (exist) {vm.group.students.push(student); }
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }
      var countPage = Math.floor(page / 10);

      if ((page % 10) != 0) { countPage++; }

      return new Array(countPage);
    };

    vm.jumpToPageStudents = function (page) {
      vm.paramsStudents.page = page;

      getStudents(vm.paramsStudents);
    };

    vm.saveGroup = function () {
      vm.loading = true;

      var students = vm.group.students;
      vm.group.students = [];
      for(var i in students){
        vm.group.students.push(students[i].id);
      }

      GroupUtils.saveGroup(vm.group)
          .then(function () {
            init();
          }, function (err) {
            $log.log('[ERROR] GroupController.saveGroup().GroupUtils.saveGroup()', err);
          });
    };

    vm.jumpToPageGroups = function (page) {
      vm.paramsGroups.page = page;

      getGroups(vm.paramsGroups);
    };

    vm.removeStudent = function (student) {
      for(var i in vm.students) {
        if (vm.students[i].id == student.id) { vm.students[i].isChecked = false;  }
      }

      this.checkedStudent(student);
    };

    vm.removeGroup = function (ev, group) {
      $mdDialog.show({
        controller: 'UsersDialogController',
        controllerAs: 'userDialog',
        templateUrl: './users/dialog/notification.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          user: group
        }
      }).then(function () {
        GroupUtils.removeGroup(group)
            .then(function (ok) {
              getGroups(vm.paramsGroups);
              getStudents(vm.paramsStudents);
            }, function (err) {
              $log.log('[ERROR] GroupController.removeGroup().GroupUtils.removeGroup()', err);
            });
      });
    }
  }
})();
