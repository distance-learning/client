(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = ['FacultyUtils'];

  function FacultyController(FacultyUtils) {
    var vm = this;
    vm.facultiesInfo = FacultyUtils.getRandomPreviewFaculties();
  }
})();
