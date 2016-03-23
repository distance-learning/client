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
      getFacultyInfo: getFacultyInfo,
      getStudents: getStudents,
      saveGroup: saveGroup,
      getGroups: getGroups
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

    function getStudents(param) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/students', { params: param })
          .success(function (ok) {
            defer.resolve(ok);
          })
          .error(function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function saveGroup(group) {
      var defer = $q.defer();

      $http.post(server_host + 'api/admin/groups', group)
          .success(function (ok) {
            defer.resolve(ok);
          })
          .error(function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function getGroups(param) {
      var defer = $q.defer();

      $http.get(server_host + '/api/admin/directions/' + param.direction.slug + '/groups')
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


