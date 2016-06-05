(function () {

  'use strict';

  angular
      .module('distanceLearning.subject')
      .factory('SubjectUtils', SubjectUtils);

  SubjectUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function SubjectUtils($q, $http,
                        server_host) {
    var service = {
      createSubject: createSubject,
      getSubjects: getSubjects,
      getSubject: getSubject,
      updateSubject: updateSubject,
      removeSubject: removeSubject,
      searchSubject: searchSubject
    };

    function createSubject(data) {
      var defer = $q.defer();

      $http.post(server_host + 'api/admin/subjects', data)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getSubjects(params) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/subjects', { params: params })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getSubject(subjectId) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/subjects/' + subjectId)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function updateSubject(data) {
      var defer = $q.defer();

      $http.put(server_host + 'api/admin/subjects/' + data.subjectId, data)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function removeSubject(subject) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/admin/subjects/' + subject.id)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function searchSubject(search) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/subjects/search', { params: { search: search }})
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();
