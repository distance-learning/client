(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileStudentController', ProfileStudentController);

  ProfileStudentController.$inject = [
    '$log', '$location', '$rootScope', '$window',
    '$mdSidenav', '$mdDialog', 'toastr',
    'ProfileUtils', 'ProfileStudentUtils', 'LoginUtils'
  ];

  function ProfileStudentController($log, $location, $rootScope, $window,
                                    $mdSidenav, $mdDialog, toastr,
                                    ProfileUtils, ProfileStudentUtils, LoginUtils) {
    var vm = this;
    vm.loading = true;
    vm.userSubjectSelected = false;
    vm.loadingTaskSubject = true;
    vm.nothingToShow = false;
    vm.fileUploadURLImage = '../assests/images/ic_attach_file_black_24px.svg';
    vm.currentSelectedDate = [];
    vm.uploadForTask = {};
    vm.userTasks = [];
    vm.subjects = [];
    vm.user = {};
    vm.task = {
      subject: 'Правознавство',
      describe: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текстаСайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых клиентов недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянный количественный рост и сфера нашей активности позволяет в Равным образом постоянный количественный рост и сфера нашей активности .',
      teacher: 'Іванов Іван Іванович'
    };
    vm.taskIconURL = './assests/images/task.png';

    $rootScope.$on('dl-calendar-selectEvent', function (event, data) {
      if (data.type == 'module') {
        vm.selectedMduleContent = data.content;

        $mdSidenav('module-content').open();
      }
      if (data.type == 'test') {
        var path = 'test/' + data.testCode;
        $location.path(path);
      }
    });

    $rootScope.$on('dl-calendar-selectDate', function (event, day) {
      console.log('selectDate', day);
    });

    $rootScope.$on('dl-calendar-setNextMonth', function (event, data) {
      getEvents({ month: data.month.value, year: data.year });
    });

    $rootScope.$on('dl-calendar-setPreviousMonth', function (event, data) {
      getEvents({ month: data.month.value, year: data.year });
    });

    $rootScope.$on('file-upload', function (event, file) {
      console.log(file);
      ProfileStudentUtils.responseFileForTask({ file: file, task: vm.uploadForTask })
          .then(function (ok) {
            $rootScope.notification('Файл додано');
          }, function (err) {
            $rootScope.notification(err);
          });
    });

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;
            vm.user.avatar = './assests/images/user_tmp.png';

            var date = new Date();
            getEvents({ month: date.getMonth(), year:date.getFullYear() });
            ProfileStudentUtils.getSubjects()
                .then(function (subjects) {
                  vm.subjects = subjects;

                  if (!angular.isArray(vm.subjects)) vm.getSubjectTask(vm.subjects[0]);
                  else vm.nothingToShow = true;

                  vm.loading = false;
                }, function (err) {
                  $log.log('[ERROR] ProfileStudentController.ProfileStudentUtils.getUser() ', err);
                });
          }, function (err) {
            $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);

            return $location.path('/home');
          });
    }

    vm.isArray = function () {
      return angular.isArray(vm.subjects);
    };

    function getEvents(date) {
      ProfileUtils.getEvents(date)
          .then(function (events) {
            vm.currentSelectedDate = events;

            getNotification();

            $rootScope.$broadcast('dl-calendar-setupEvents', vm.currentSelectedDate);
          }, function (err) {
            $rootScope.notification(err);
          });
    }

    function getNotification() {
      ProfileUtils.getNotification()
          .then(function (notification) {
            for(var i in notification) {
              toastr.success('[' + notification[i].deadline.split(" ")[0] + ']' + notification[i].attachment.attachment.name, 'Нагадування');
            }
          }, function (err) {
            $rootScope.notification(err);
          });
    }

    vm.getSubjectTask = function (subject) {
      vm.loadingTaskSubject = true;
      vm.userSubjectSelected = true;

      ProfileStudentUtils.getUserTask(subject.subject.id)
          .then(function (tasks) {
            vm.userTasks = tasks;

            vm.loadingTaskSubject = false;
          }, function (err) {
            $log.log('[ERROR] ProfileStudentController.getSubjectTask().ProfileStudentUtils.getUserTask()', err);

            $rootScope.notification(err);
          })
    };

    vm.showModuleContent = function (module) {
      if (module.attachment_type == 'module') {
        vm.selectedMduleContent = module.attachment.content;

        $mdSidenav('module-content').open();
      }
      if (module.attachment_type == 'test') {
        var path = 'test/' + module.attachment.code;
        $location.path(path);
      }
    };

    vm.uploadFile = function (task) {
      if (task.attachment_type == 'module') {
        vm.uploadForTask = task;
        $mdDialog.show({
          controller: 'dlFileUploadFileController',
          controllerAs: 'dlFileUploadFile',
          templateUrl: './component/dlFileUpload/file/dlFileUploadFile.html',
          clickOutsideToClose: false
        });
      }
      if (task.attachment_type == 'test') {
        ProfileStudentUtils.downloadFile(task.attachment.code)
            .then(function (file) {
              $window.open(file.path, '_blank');
            }, function (err) {
              $rootScope.notification(err);
            })
      }
    };
  }
})();