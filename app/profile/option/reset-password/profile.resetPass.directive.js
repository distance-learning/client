(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .directive('profileResetPassword', profileResetPassword);

  profileResetPassword.$inject = [];

  function profileResetPassword() {
    return {
      replace: true,
      controller: 'ProfileResetPassController',
      controllerAs: 'UserResetPass',
      templateUrl: './profile/option/reset-password/profile.resetPass.html'
    };
  }
})();
