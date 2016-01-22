(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .directive('profileAdmin', profileAdmin);

  profileAdmin.$inject = [];

  function profileAdmin() {
    return {
      replace: true,
      controller: 'ProfileAdminController',
      controllerAs: 'profileAdmin',
      templateUrl: './profile/admin/profileAdmin.html'
    };
  }
})();
