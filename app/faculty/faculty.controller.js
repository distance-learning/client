(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .controller('FacultyController', FacultyController);

  FacultyController.$inject = [
    '$log', '$location',
    'FacultyHomeUtils', 'FacultyListUtils', 'FacultyUtils'
  ];

  function FacultyController($log, $location,
                             FacultyHomeUtils, FacultyListUtils, FacultyUtils) {
    var vm = this;
    vm.params = {};

    getFaculties();

    function getFaculties() {
      var path = $location.path();
      if (path === '/faculties') {
        FacultyListUtils.getFaculties(vm.params)
            .then(function (ok) {
              vm.faculties = {
                faculties: ok.data.data,
                total: ok.data.total
              };
              if (!FacultyUtils.getLocalFaculty()) {
                FacultyUtils.saveLocalFaculty(vm.faculties.faculties[0].slug);
              }

              prepareFaculties();

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

    function prepareFaculties() {
      vm.teachers = [];
      if (checkFacilties(FacultyUtils.getLocalFaculty())) {
        getFacultyBySlug(FacultyUtils.getLocalFaculty());
      } else {
        getFacultyBySlug(vm.faculties.faculties[0].slug);
      }

      vm.faculties.directions = getCurrentDirections(vm.faculties.faculties);
      vm.faculties.subjects = getCurrentSubjects(vm.faculties.directions, FacultyUtils.getLocalFaculty());
      vm.teachers = getTeachers(vm.faculties.faculties);
    }

    function checkFacilties(slug) {
      var findFaculty = false;

      for (var i in vm.faculties) {
        if (vm.faculties[i].slug === slug) {
          findFaculty = true;
        }
      }

      return findFaculty;
    }

    vm.showFaculty = function (facultySlug) {
      FacultyUtils.saveLocalFaculty(facultySlug);
      $location.path('/faculties');
    };

    function getFacultyBySlug(slug) {
      if (slug) {
        return slug;
      }

      FacultyUtils.saveLocalFaculty(vm.faculties.faculties[0].slug);
    }

    function getCurrentDirections(faculties) {
      var slug = FacultyUtils.getLocalFaculty();
      var result = {};

      for (var i in faculties) {
        if (faculties[i].slug === slug) {
          result = faculties[i].directions;
        }
      }

      return result;
    }

    function getCurrentSubjects(directions, currentDirections) {
      var result = [];
      if (directions.length) {
        result = directions[0].subjects;
      }

      for (var i in directions) {
        if (directions[i] === currentDirections) {
          result = directions[i].subjects;
        }
      }

      return result;
    }

    function getTeachers(faculties) {
      var slug = FacultyUtils.getLocalFaculty();
      var result = [];

      for (var i in faculties) {
        if (faculties[i].slug === slug) {
            result = faculties[i].teachers;
        }
      }

      return result;
    }

    vm.showDirectionsInfo = function (directions) {
      vm.faculties.subjects = getCurrentSubjects(vm.faculties.directions, directions);
    };

    vm.range = function (page) {
      if (!page) {
        return new Array(1);
      }
      var countPage = Math.floor(page / 5);

      if ((page % 5) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.jumpToPage = function (page) {
      FacultyUtils.saveLocalFaculty('');

      vm.params.page = page;
      getFaculties();
      prepareFaculties();
    };

    vm.showFacultyInfo = function (facultySlug) {
      FacultyUtils.saveLocalFaculty(facultySlug);

      prepareFaculties();
    };
  }
})();
