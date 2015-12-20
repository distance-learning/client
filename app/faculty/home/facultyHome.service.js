(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyHome')
      .factory('FacultyUtils', FacultyUtils);

  FacultyUtils.$inject = [
    '$http', '$q',
    'server_host'
  ];

  function FacultyUtils($http, $q, server_host) {
    var service = {
      getRandomPreviewFaculties: getRandomPreviewFaculties
    };

    function getRandomPreviewFaculties() {
      var defer = $q.defer();

      $http.get(server_host + 'api/faculties/random')
          .then(function (data, status, headers, config) {
            defer.resolve(data);
          });

      return defer.promise;
    }

    return service;
  }
})();
