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
                currentFaculty: $routeParams.slug,
                faculties: ok.data.data,
                total: ok.data.total
             };
            vm.faculties.directions = getCurrecntDirections(vm.faculties.faculties);
            vm.faculties.directions.currentDirections = vm.faculties.directions[0];
            vm.faculties.subjects = getCurrecntSubjects(vm.faculties.directions, vm.faculties.directions.currentDirections);
            vm.faculties.teachers = getTeachers(vm.faculties.faculties);
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

    function getTeachers (faculties) {
      var result = {};

      for(var i in faculties){
        if (faculties[i].slug === $routeParams.slug) {
          result = faculties[i].teachers;
        }
      }

      return result;
    }

    vm.showDirectionsInfo = function (directions) {
      vm.faculties.subjects = getCurrecntSubjects(vm.faculties.directions, directions);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      return new Array(Math.floor(page/5));
    };

    vm.jumpToPage = function (page) {
      $log.log(page);
    };

  }
})();
