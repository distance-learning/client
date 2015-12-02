(function () {
  'use strict';

  angular
      .module('distanceLearning.teacher')
      .factory('TeacherUtils', TeacherUtils);

  TeacherUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function TeacherUtils($q, $http, server_host) {
    var teachers = [
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      },
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      },
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      },
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      },
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      },
      {
        name: 'Варламова Ирина',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi nisi, rutrum vitae nunc non, bibendum euismod nulla.',
        image: '/assests/images/teacher.png'
      }
    ];
    var service = {
      getTeachers: getTeachers
    };

    function getTeachers() {
      var defer = $q.defer();

      $http.get(server_host + 'api/teachers/random')
          .then(function (data, status, headers, config) {
            defer.resolve(data);
          });

      return defer.promise;
    }

    return service;
  }
})();
