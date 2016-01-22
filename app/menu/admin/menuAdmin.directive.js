(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .directive('menuAdmin', menuAdmin);

  menuAdmin.$inject = [];

  function menuAdmin() {
    return {
      replace: true,
      controller: 'MenuAdminController',
      controllerAs: 'menuAdmin',
      templateUrl: './menu/admin/menuAdmin.html'
    };
  }
})();
