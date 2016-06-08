(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .factory('UsersUtils', UsersUtils);

  UsersUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function UsersUtils($q, $http,
                      server_host) {
    var service = {
      getUsers: getUsers,
      changeUser: changeUser,
      createUser: createUser,
      deleteUser: deleteUser,
      getUserBySlug: getUserBySlug,
      searchUser: searchUser
    };

    function getUsers(value) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users', { params: { page: value } })
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
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
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function createUser(user) {
      var defer = $q.defer();
      var value = {
        name: user.name,
        surname: user.surname,
        birthday: user.birthday.getFullYear() + '-' + user.birthday.getMonth() + '-' + user.birthday.getDate(),
        phone: user.phone,
        email: user.email,
        role: user.role,
        description: '',
        password: user.password
      };

      $http.post(server_host + 'api/admin/users', value)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function deleteUser(user) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/admin/users/' + user.slug)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function getUserBySlug(slug) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users/' + slug)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function searchUser(search) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/users/search', { params: { search: search }})
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();
