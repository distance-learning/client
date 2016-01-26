(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileStudentController', ProfileStudentController);

  ProfileStudentController.$inject = [
    '$log', '$location',
    'ProfileUtils', 'ProfileStudentUtils', 'LoginUtils'
  ];

  function ProfileStudentController($log, $location,
                                    ProfileUtils, ProfileStudentUtils, LoginUtils) {
    var vm = this;
    vm.loading = true;
    vm.currentSelectedDate = {};
    vm.user = {};
    vm.task = {
      subject: 'Правознавство',
      describe: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текстаСайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых клиентов недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянный количественный рост и сфера нашей активности позволяет в Равным образом постоянный количественный рост и сфера нашей активности .',
      teacher: 'Іванов Іван Іванович'
    };
    vm.taskIconURL = './assests/images/task.png';

    init();
    function init() {
      vm.loading = true;
      if (LoginUtils.isLogged()) {
        ProfileUtils.getUserInfo()
            .then(function (ok) {
              vm.user = ok;

              vm.loading = false;
            }, function (err) {
              $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
              return $location.path('/home');
            });

        ProfileStudentUtils.getSubjects()
            .then(function (ok) {
              vm.subjects = ok;
            }, function (err) {
              $log.log('[ERROR] ProfileStudentController.ProfileStudentUtils.getUser() ', err);
            });
      } else {
        $location.path('/home');
      }
    }
  }
})();