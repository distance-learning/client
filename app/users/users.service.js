(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .factory('UsersUtils', UsersUtils);

  UsersUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function UsersUtils($q, $http, server_host) {
    var service = {
      getUsers: getUsers
    };

    function getUsers(value) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users', { params: { page: value.page } })
          .then(function (ok) {
            console.log('ok', ok);
            defer.resolve(ok);
          }, function (err) {
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();
