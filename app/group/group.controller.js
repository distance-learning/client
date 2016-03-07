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
    vm.group = {
      name: 'Назва групи',
      faculty: {},
      direction: {}
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      GroupUtils.getFacultyInfo()
          .then(function (ok) {
            vm.faculties = ok;
            vm.directions = vm.faculties[0].directions;
            vm.group.faculty.id = vm.faculties[0].id;
            vm.group.faculty.name = vm.faculties[0].name;
            vm.group.direction.id = vm.faculties[0].directions[0].id;
            vm.group.direction.name = vm.faculties[0].directions[0].name;

            GroupUtils.getStudents()
                .then(function (ok) {
                  vm.students = ok;

                  vm.loading = false;
                }, function (err) {
                  $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo().GroupUtils.getStudents()', err);
                });
          }, function (err) {
            $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo()', err);
          });
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
  }
})();
