(function () {
  'use strict';

  angular
      .module('distanceLearning.menu')
      .directive('menuClient', menuClient);

  menuClient.$inject = [];

  function menuClient() {
    return {
      replace: true,
      controller: 'MenuClientController',
      controllerAs: 'menuClient',
      templateUrl: 'menu/client/menuClient.html'
    };
  }
})();
