(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileStudentUtils', ProfileStudentUtils);

  ProfileStudentUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function ProfileStudentUtils($q, $http,
                               server_host) {
    var service = {
      getSubjects: getSubjects,
      getUserTask: getUserTask,
      responseFileForTask: responseFileForTask,
      downloadFile: downloadFile
    };

    function getSubjects() {
      var defer = $q.defer();

      $http.get(server_host + 'api/account/courses')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getUserTask(subjectId) {
      var defer = $q.defer();

      $http.get(server_host + 'api/account/subjects/' + subjectId + '/tasks')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function responseFileForTask(data) {
      var defer = $q.defer();

      $http.put(server_host + 'api/tasks/' + data.task.id + '/files/' + data.file.id)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function downloadFile(testCode) {
      var defer = $q.defer();

      $http.get(server_host + '/api/tests/' +  testCode + '/export')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();


