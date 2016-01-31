(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .directive('resetPass', resetPass);

  resetPass.$inject = [];

  function resetPass() {
    return {
      replace: true,
      controller: 'ResetPassController',
      controllerAs: 'resetPass',
      templateUrl: './auth/reset/resetPass.html'
    };
  }
})();