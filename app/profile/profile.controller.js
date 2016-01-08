(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileController', ProfileController);

  ProfileController.$inject = [];

  function ProfileController() {
    var vm = this;

    vm.user = {
      role: 'student'
    };
  }
})();