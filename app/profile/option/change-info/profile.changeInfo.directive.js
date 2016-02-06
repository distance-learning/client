(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .directive('profileChangeInfo', profileChangeInfo);

  profileChangeInfo.$inject = [];

  function profileChangeInfo() {
    return {
      replace: true,
      controller: 'ProfileChangeInfoController',
      controllerAs: 'UserChangeInfo',
      templateUrl: './profile/option/change-info/profile.changeInfo.html'
    };
  }
})();
