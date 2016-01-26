(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileStudentUtils', ProfileStudentUtils);

  ProfileStudentUtils.$inject = [
    '$q', '$http'
  ];

  function ProfileStudentUtils($q, $http) {
    var service = {
      getSubjects: getSubjects
    };

    function getSubjects() {
      var defer = $q.defer();
      var subjects = [
        {
          name: 'Правознавство',
          action: [
            {
              student: 'Vasa'
            },
            {
              student: 'Ivan'
            },
            {
              student: 'Vasa'
            },
            {
              student: 'Vasa'
            },
            {
              student: 'Vasa'
            },
            {
              student: 'Vasa'
            }
          ]
        },
        {
          name: 'Історія України',
          action: []
        },
        {
          name: 'Англійська мова',
          action: [
            {
              student: 'Vasa'
            }
          ]
        },
        {
          name: 'Економіка',
          action: []
        }
      ];

      defer.resolve(subjects);
      return defer.promise;
    }

    return service;
  }
})();


