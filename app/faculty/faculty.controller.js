(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = [
    '$routeParams', '$log',
    'FacultyHomeUtils', 'FacultyListUtils'];

  function FacultyController($routeParams, $log,
                             FacultyHomeUtils, FacultyListUtils) {
    var vm = this;

    if ($routeParams.slug) {
      FacultyListUtils.getFaculties()
          .then(function (ok) {
            vm.faculties = {
                faculties: ok.data.data,
                total: ok.data.total
             };
            vm.faculties.currentFaculty = $routeParams.slug;
            vm.faculties.directions = getCurrecntDirections(vm.faculties.faculties);
            vm.faculties.directions.currentDirections = vm.faculties.directions[0];
            vm.faculties.subjects = getCurrecntSubjects(vm.faculties.directions, vm.faculties.directions.currentDirections);
          }, function (error) {
            $log.log('[ERROR] FacultyController.FacultyListUtils.getFaculties()', error);
          })
    } else {
      FacultyHomeUtils.getRandomPreviewFaculties()
          .then(function (data) {
            vm.facultiesInfo = data.data;
          });
    }

    function getCurrecntDirections (faculties) {
      var result = {};

      for(var i in faculties){
        if (faculties[i].slug === $routeParams.slug) {
          result = faculties[i].directions;
        }
      }

      return result;
    }

    function getCurrecntSubjects(directions, currentDirections) {
      var result = {};

      for(var i in directions){
        if (directions[i] === currentDirections) {
          result = directions[i].subjects;
        }
      }

      return result;
    }

    vm.showDirectionsInfo = function (directions) {
      vm.faculties.subjects = getCurrecntSubjects(vm.faculties.directions, directions);
      console.log(1);
    }

  }
})();
