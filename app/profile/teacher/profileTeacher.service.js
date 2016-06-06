(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileTeacherUtils', ProfileTeacherUtils);

  ProfileTeacherUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function ProfileTeacherUtils($q, $http,
                               server_host) {
    var service = {
      getGroups: getGroups,
      getStudents: getStudents,
      getStudentTasks: getStudentTasks,
      getFaculties: getFaculties,
      getSubjectsWithGroups: getSubjectsWithGroups,
      setupTaskForGroup: setupTaskForGroup,
      setupTaskForStudent: setupTaskForStudent,
      addModuleContent: addModuleContent,
      updateModuleContent: updateModuleContent,
      getTaskForGroup: getTaskForGroup,
      getTaskForStudent: getTaskForStudent,
      removeTask: removeTask,
      getTeacherModule: getTeacherModule,
      addModuleGroup: addModuleGroup,
      removeModuleFromGroup: removeModuleFromGroup,
      updateModuleGroupName: updateModuleGroupName
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

    function getSubjectsWithGroups() {
      var defer = $q.defer();

      $http.get(server_host + 'api/account/subjects')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function setupTaskForGroup(data) {
      // data.target = group
      // data.data = task
      var defer = $q.defer();
      var value = {
        attachment_id: data.data.id,
        attachment_type: 'module',
        group_slug: data.target.slug,
        deadline: data.deadline.getFullYear() + '-' + data.deadline.getMonth() + '-' + data.deadline.getDate()
      };

      $http.post(server_host + 'api/tasks/groups', value)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function setupTaskForStudent(data) {
      // data.target = student
      // data.data = task
      var defer = $q.defer();
      var value = {
        attachment_id: data.data.id,
        attachment_type: 'module',
        student_id: data.target.id,
        deadline: data.deadline.getFullYear() + '-' + data.deadline.getMonth() + '-' + data.deadline.getDate()
      };

      $http.post(server_host + 'api/tasks', value)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function addModuleContent(data) {
      console.log(data);
      var defer = $q.defer();
      var value = {
        name: data.moduleInfo.name,
        content: data.content,
        module_group_id: data.moduleInfo.module_group_id
      };

      $http.post(server_host + 'api/modules', value)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function updateModuleContent(data){
      // data.content = module content
      // data.target = id moduleGroup
      var defer = $q.defer();
      var value = {
        name: data.moduleInfo.name,
        content: data.content,
        module_group_id: data.moduleInfo.module_group_id
      };

      $http.put(server_host + 'api/modules/' + data.target, value)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getTaskForGroup(group) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getTaskForStudent (student) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function removeTask(data) {
      //data.task
      //data.target = group | student
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getTeacherModule() {
      var defer = $q.defer();

      $http.get(server_host + 'api/account/modules')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function addModuleGroup(moduleName) {
      var defer = $q.defer();

      $http.post(server_host + 'api/modules/groups', { name: moduleName })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function removeModuleFromGroup(moduleId) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/modules/' + moduleId)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function updateModuleGroupName(data) {
      //data.name
      //data.module_group_id
      var defer = $q.defer();

      $http.put(server_host + 'api/modules/groups/' + data.module_group_id, { name: data.name })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();


