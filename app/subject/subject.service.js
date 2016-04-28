(function () {

  'use strict';

  angular
      .module('distanceLearning.subject')
      .factory('SubjectUtils', SubjectUtils);

  SubjectUtils.$inject = [
    '$q', '$http'
  ];

  function SubjectUtils($q, $http) {
    var service = {
      createSubject: createSubject,
      getSubjects: getSubjects,
      getSubject: getSubject,
      updateSubject: updateSubject,
      removeSubject: removeSubject
    };

    function createSubject(subject) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getSubjects(params) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getSubject(slug) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function updateSubject(subject) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function removeSubject(subject) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    return service;
  }
})();
