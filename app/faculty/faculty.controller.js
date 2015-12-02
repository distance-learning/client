(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = ['FacultyUtils'];

  function FacultyController(FacultyUtils) {
    var vm = this;
    FacultyUtils.getRandomPreviewFaculties()
        .then(function (data) {
          vm.facultiesInfo = data.data;
        });
  }
})();
