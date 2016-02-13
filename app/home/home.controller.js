(function () {
  'use strict';

  angular
      .module('distanceLearning.home')
      .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$location', '$log',
    'LoginUtils', 'ProfileUtils'
  ];

  function HomeController($location, $log,
                          LoginUtils, ProfileUtils) {
    var vm = this;
    vm.logoutIconURL = './assests/images/ic_weekend_black_24px.svg';
    vm.user = {};
    vm.specialtyAreas = [
      { name: 'Програмне забезпечення автоматизованих систем.' },
      { name: 'Інформаційні управляючі системи та технології.' },
      { name: 'Інтелектуальні системи прийняття рішень.' },
      { name: 'Комп‘ютерний еколого-економічний моніторинг.' },
      { name: 'Англійська мова та література.' },
      { name: 'Практична психологія.' },
      { name: 'Соціальна педагогіка.' }
    ];

    init();
    function init() {
      vm.user = {};
      if (LoginUtils.isLogged()) {
        ProfileUtils.getUserInfo()
            .then(function (ok) {
              vm.user = ok;
            }, function (err) {
              $log.log('[ERROR] HomeController.init().ProfileUtils.getUserInfo()', err);
            });
      }
    }

    vm.userCheck = function () {
      return LoginUtils.isLogged();
    };

    vm.goToProfile = function () {
      var path = '/home';

      if (vm.user.role == 'admin') { path = '/profile/admin'; }
      if (vm.user.role == 'teacher') { path = '/profile/teacher'; }
      if (vm.user.role == 'student') { path = '/profile/student'; }

      return $location.path(path);
    };

    vm.logout = function () {
      LoginUtils.logout();
    };
  }
})();
