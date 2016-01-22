(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .factory('FacultyUtils', FacultyUtils);

  FacultyUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function FacultyUtils($q, $http,
                            server_host) {
    var faculty = '';
    var service = {
      saveLocalFaculty: saveLocalFaculty,
      getLocalFaculty: getLocalFaculty
    };

    function saveLocalFaculty(value) {
      var defer = $q.defer();

      faculty = value;
      defer.resolve(faculty);

      return defer.promise;
    }

    function getLocalFaculty() {

      return faculty;
    }

    return service;
  }
})();
