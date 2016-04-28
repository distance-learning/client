(function () {

  'use strict';

  angular
      .module('distanceLearning.course')
      .factory('CourseUtils', CourseUtils);

  CourseUtils.$inject = [
    '$q', '$http'
  ];

  function CourseUtils($q, $http) {
    var service = {
      createCourse: createCourse,
      getCourses: getCourses,
      getCourse: getCourse,
      updateCourse: updateCourse,
      removeCourse: removeCourse
    };

    function createCourse(course) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getCourses() {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getCourse(slug) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function updateCourse(course) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function removeCourse(course) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    return service;
  }
})();
