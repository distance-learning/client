(function () {
  'use strict';

  angular
      .module('distanceLearning.group')
      .controller('GroupController', GroupController);

  GroupController.$inject = [
    '$location', '$log',
    'LoginUtils', 'GroupUtils'
  ];

  function GroupController($location, $log,
                           LoginUtils, GroupUtils) {
    var vm = this;
    vm.loading = true;
    vm.saveGroupIconURL = './assests/images/ic_save_black_24px.svg';
    vm.loadingStudents = true;

    init();
    function init() {
      vm.loading = true;
      vm.loadingStudents = true;
      vm.params = {
        page: 1
      };
      vm.group = {
        name: 'Назва групи',
        faculty: {},
        direction: {},
        students: []
      };

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      GroupUtils.getFacultyInfo(vm.params)
          .then(function (ok) {
            vm.faculties = ok;
            vm.directions = vm.faculties[0].directions;
            vm.group.faculty.id = vm.faculties[0].id;
            vm.group.faculty.name = vm.faculties[0].name;
            vm.group.direction.id = vm.faculties[0].directions[0].id;
            vm.group.direction.name = vm.faculties[0].directions[0].name;

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

          vm.group.faculty.id = vm.faculties[i].id;
          vm.group.faculty.name = vm.faculties[i].name;
          vm.group.direction.id = vm.faculties[i].directions[0].id;
          vm.group.direction.name = vm.faculties[i].directions[0].name;
        }
      }
    };

    vm.selectDirection = function (direction) {
      vm.group.direction = direction;
    };

    vm.editGroupName = function (newName) {
      if (!newName) { vm.group.name = 'Назва групи' }
      else { vm.group.name = newName; }
    };

    vm.checkedStudent = function (student) {
      var index = vm.group.students.indexOf(student);

      if (index > -1) { vm.group.students.splice(index, 1); }
      else { vm.group.students.push(student); }
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }
      var countPage = Math.floor(page / 10);

      if ((page % 5) != 0) { countPage++; }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getStudents(vm.params);
    };

    vm.saveGroup = function () {
      console.log(1);
      //GroupUtils.saveGroup(vm.group)
      //    .then(function () {
      //      init();
      //    }, function (err) {
      //      $log.log('[ERROR] GroupController.saveGroup().GroupUtils.saveGroup()', err);
      //    });
    };
  }
})();
