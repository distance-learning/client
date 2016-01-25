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

    LoginUtils.userProfile()
        .then(function (ok) {
          vm.user = ok;
        }, function () {
          vm.user = {};
        });

    vm.userCheck = function () {
      return LoginUtils.isLogged();
    };

    vm.gotoProfile = function () {
      $location.path('/profile');
    };

    vm.logout = function () {
      LoginUtils.logout();
    };
  }
})();
