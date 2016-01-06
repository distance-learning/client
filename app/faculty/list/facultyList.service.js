(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .factory('FacultyListUtils', FacultyListUtils);

  FacultyListUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function FacultyListUtils($q, $http,
                            server_host) {
    var service = {
      getFaculties: getFaculties
    };

    function getFaculties() {
      var defer = $q.defer();

      $http.get(server_host + 'api/faculties')
          .then(function (ok) {
            defer.resolve(ok);
          }, function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();
