(function () {
  'use strict';

  angular
      .module('distanceLearning.teacher')
      .factory('TeacherUtils', TeacherUtils);

  TeacherUtils.$inject = [];

  function TeacherUtils() {
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
      return teachers;
    }

    return service;
  }
})();
