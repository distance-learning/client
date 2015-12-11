(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty-info')
      .factory('FacultyInfoUtils', FacultyInfoUtils);

  FacultyInfoUtils.$inject = [
    '$q', '$http',
      'server_host'
  ];

  function FacultyInfoUtils($q, $http,
                            server_host) {
    var service = {
      getFacultyInfo: getFacultyInfo
    };

    function getFacultyInfo(facultySlug) {
      var defer = $q.defer();

      $http.get(server_host + 'api/faculties/random')
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
