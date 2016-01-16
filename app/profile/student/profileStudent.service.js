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
      getUser: getUser,
      getSubjects: getSubjects
    };

    function getUser() {
      var defer = $q.defer();
      var user = {
        name: 'Constantine',
        surname: 'Zarzhytskyy',
        avatar: 'assests/images/user_tmp.png',
        birthday: '01/01/2016',
        phone: '+380994203529',
        slug: 'Constantine_Zarzhytskyy',
        role: 'student',
        email: 'student@localhost.com'
      };

      defer.resolve(user);
      return defer.promise;
    }

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


