(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .factory('UsersUtils', UsersUtils);

  UsersUtils.$inject = [
    '$q', '$http', '$auth',
    'server_host'
  ];

  function UsersUtils($q, $http, $auth,
                      server_host) {
    var service = {
      getUsers: getUsers
    };

    function getUsers(value) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users', { params: { page: value.page } })
          .success(function(ok, status, headers, config){
            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');

            $auth.setToken(refreshToken);
            defer.resolve(ok);
          })
          .error(function(err, status, headers, config){
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();
