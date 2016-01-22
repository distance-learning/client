(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
      '$log',
      'LoginUtils'
  ];

  function ProfileController($log,
                             LoginUtils) {
    var vm = this;
    vm.user = LoginUtils.getUserInfo();
  }
})();