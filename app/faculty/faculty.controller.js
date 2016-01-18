(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = [
    '$routeParams', '$log', '$location',
    'FacultyHomeUtils', 'FacultyListUtils'];

  function FacultyController($routeParams, $log, $location,
                             FacultyHomeUtils, FacultyListUtils) {
    var vm = this;

    function getFaculties(path) {
      if ($routeParams.slug) {
        if (!path) { path = $location.search(); }

        FacultyListUtils.getFaculties(path)
            .then(function (ok) {
              vm.faculties = {
                faculties: ok.data.data,
                total: ok.data.total
              };
              vm.faculties.currentFaculty = getFacultybySlug($routeParams.slug);
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
    }

    getFaculties({ page: 1 });

    function getFacultybySlug(slug) {
      if (slug) { return slug; }

      return vm.faculties.faculties[0];
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
      var countPage = Math.floor(page / 5);

      if ((page % 5) != 0) { countPage++; }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      getFaculties({ page: page });
    };

  }
})();
