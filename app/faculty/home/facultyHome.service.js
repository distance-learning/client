(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyHome')
      .factory('FacultyHomeUtils', FacultyHomeUtils);

  FacultyHomeUtils.$inject = [
    '$http', '$q',
    'server_host'
  ];

  function FacultyHomeUtils($http, $q, server_host) {
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
