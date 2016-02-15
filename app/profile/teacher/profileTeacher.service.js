(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileTeacherUtils', ProfileTeacherUtils);

  ProfileTeacherUtils.$inject = [
    '$q', '$http'
  ];

  function ProfileTeacherUtils($q, $http) {
    var service = {
      getGroups: getGroups
    };

    function getGroups(teacher) {
      var defer = $q.defer();

      var groups = [
        {
          title: 'KE-11',
          users: [
            {
              name: 'Vasa',
              surname: 'Pupkin'
            },
            {
              name: 'Ivan',
              surname: 'Dupkin'
            },
            {
              name: 'John',
              surname: 'Smit'
            }
          ]
        },
        {
          title: 'KE-12',
          users: [
            {
              name: 'Vasa',
              surname: 'Pupkin'
            },
            {
              name: 'Ivan',
              surname: 'Dupkin'
            },
            {
              name: 'John',
              surname: 'Smit'
            }
          ]
        },
        {
          title: 'KE-13',
          users: [
            {
              name: 'Vasa',
              surname: 'Pupkin'
            },
            {
              name: 'Ivan',
              surname: 'Dupkin'
            },
            {
              name: 'John',
              surname: 'Smit'
            }
          ]
        },
        {
          title: 'KE-14',
          users: [
            {
              name: 'Vasa',
              surname: 'Pupkin'
            },
            {
              name: 'Ivan',
              surname: 'Dupkin'
            },
            {
              name: 'John',
              surname: 'Smit'
            }
          ]
        }
      ];

      defer.resolve(groups);
      return defer.promise;
    }

    return service;
  }
})();


