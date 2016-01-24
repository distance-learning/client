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
      getUsers: getUsers,
      changeUser: changeUser,
      createUser: createUser,
      deleteUser: deleteUser
    };

    function getUsers(value) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users', {params: {page: value.page}})
          .success(function (ok, status, headers, config) {
            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');

            $auth.setToken(refreshToken);
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    function changeUser(user) {
      var defer = $q.defer();
      var value = {
        name: user.name,
        surname: user.surname,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        role: user.role,
        description: '',
        password: user.password
      };

      $http.put(server_host + 'api/admin/users/' + user.slug, value)
          .success(function (ok, status, headers, config) {
            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');

            $auth.setToken(refreshToken);
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    function createUser(user) {
      var defer = $q.defer();
      var value = {
        name: user.name,
        surname: user.surname,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        role: user.role,
        description: '',
        password: user.password
      };

      $http.post(server_host + 'api/admin/users', value)
          .success(function (ok, status, headers, config) {
            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');

            $auth.setToken(refreshToken);
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    function deleteUser(user) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/admin/users/' + user.slug)
          .success(function (ok, status, headers, config) {
            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');

            $auth.setToken(refreshToken);
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            console.log('err', err);
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();
