(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .directive('userPageInfo', userPageInfo);

  userPageInfo.$inject = [];

  function userPageInfo() {
    return {
      replace: true,
      controller: 'UserInfoController',
      controllerAs: 'userPageInfo',
      templateUrl: './users/info/userPage.html'
    };
  }
})();
