(function () {
  'use strict';

  angular
      .module('distanceLearning.teacher')
      .controller('TeacherController', TeacherController);

  TeacherController.$inject = ['TeacherUtils'];

  function TeacherController(TeacherUtils) {
    var vm = this;
    vm.teachers = TeacherUtils.getTeachers();
    console.log(vm.teachers);
  }
})();
