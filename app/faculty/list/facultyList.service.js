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
      getFaculties: getFaculties,
      getAdminFaculties: getAdminFaculties,
      removeAdminFaculty: removeAdminFaculty
    };

    function getFaculties(params) {
      var defer = $q.defer();
      var parameters = {
        page: params.page
      };

      $http.get(server_host + 'api/faculties', { params: parameters })
          .then(function (ok) {
            defer.resolve(ok);
          }, function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function getAdminFaculties(params) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/faculties', { params: params })
          .then(function (ok) {
            defer.resolve(ok);
          }, function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function removeAdminFaculty(faculty) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/admin/faculties/' + faculty.slug)
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
