(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileUtils', ProfileUtils);

  ProfileUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function ProfileUtils($q, $http,
                        server_host) {
    var service = {
      getUserInfo: getUserInfo,
      userResetPassword: userResetPassword,
      sendConfirmation: sendConfirmation,
      changeInfo: changeInfo,
      getEvents: getEvents,
      getNotification: getNotification
    };

    function getUserInfo() {
      var defer = $q.defer();

      $http.get(server_host + 'api/account')
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function userResetPassword(user) {
      var defer = $q.defer();

      $http.put(server_host + 'api/account/reset-password', user)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function sendConfirmation(token) {
      var defer = $q.defer();

      $http.post(server_host + 'api/auth/reset-password/' + token)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function changeInfo(user) {
      var defer = $q.defer();

      $http.put(server_host + 'api/account/update', user)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function getEvents(value) {
      var defer = $q.defer();

      $http.get(server_host + 'api/events', { params: { month: value.month + 1, year: value.year } })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getNotification() {
      var defer = $q.defer();

      $http.get(server_host + 'api/events/notifications')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();


