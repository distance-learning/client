(function () {
  'use strict';

  angular
      .module('distanceLearning.group')
      .factory('GroupUtils', GroupUtils);

  GroupUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function GroupUtils($q, $http,
                        server_host) {
    var service = {
      getFacultyInfo: getFacultyInfo
    };

    function getFacultyInfo() {
      var defer = $q.defer();

      $http.get(server_host + 'api/auth/faculties')
          .success(function (ok) {
            defer.resolve(ok);
          })
          .error(function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();


