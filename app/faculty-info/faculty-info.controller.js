(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty-info')
      .controller('FacultyInfoController', FacultyInfoController);

  FacultyInfoController.$inject = [
    '$routeParams',
    'FacultyInfoUtils'
  ];

  function FacultyInfoController($routeParams,
                                 FacultyInfoUtils) {
    var vm = this;

    FacultyInfoUtils.getFacultyInfo($routeParams.slug)
        .then(function (data) {
          vm.currentFaculty = data.data;
        }, function (err) {
          console.log('[ERROR] FacultyInfoUtils.getFacultyInfo() in FacultyInfoController', err);
        });

  }
})();
