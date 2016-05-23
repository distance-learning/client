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
      getGroups: getGroups,
      getStudents: getStudents,
      getStudentTasks: getStudentTasks,
      getFaculties: getFaculties,
      getSubjectsWithGroups: getSubjectsWithGroups,
      getTasks: getTasks,
      setupTaskForGroup: setupTaskForGroup,
      setupTaskForStudent: setupTaskForStudent,
      addModuleContent: addModuleContent
    };

    // TODO: deprecated?
    function getGroups(subject) {
      var defer = $q.defer();

      var groups = [
        {
          name: 'KE-11',
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
          name: 'KE-12',
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
          name: 'KE-13',
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
          name: 'KE-14',
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

    // TODO: deprecated?
    function getStudents(group) {
      var defer = $q.defer();

      defer.resolve(group.users);
      return defer.promise;
    }

    function getStudentTasks(student) {
      var defer = $q.defer();
      var task = {
        subject: 'Правознавство',
        describe: '12312312312С123генерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текстаСайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых клиентов недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянный количественный рост и сфера нашей активности позволяет в Равным образом постоянный количественный рост и сфера нашей активности .',
        student: student.surname + ' ' + student.name[0]
      };

      defer.resolve(task);
      return defer.promise;
    }

    // TODO: deprecated?
    function getFaculties(teacher) {
      var defer = $q.defer();
      var faculties = [
        {
          title: 'fotius',
          id: 1
        },
        {
          title: 'fotius1',
          id: 2
        },
        {
          title: 'fotius2',
          id: 3
        },
        {
          title: 'fotius3',
          id: 4
        }
      ];

      defer.resolve(faculties);
      return defer.promise;
    }

    function getSubjectsWithGroups(teacher) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getTasks(group) {
      var defer = $q.defer();
      var tasks = [{
        id: 1,
        name: 'Tasks 1'
      }, {
        id: 2,
        name: 'Tasks 2'
      }, {
        id: 3,
        name: 'Tasks 3'
      }];

      defer.resolve(tasks);
      return defer.promise;
    }

    function setupTaskForGroup(data) {
      // data.target = group
      // data.data = task
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function setupTaskForStudent(data) {
      // data.target = student
      // data.data = task
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function addModuleContent(data) {
      // data.content = module content
      // data.target = id moduleGroup
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    return service;
  }
})();


