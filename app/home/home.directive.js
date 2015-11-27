(function () {
  'use strict';

  angular
      .module('distanceLearning.home')
      .directive('home', home);

  home.$inject = [];

  function home() {
    return {
      replace: true,
      controller: 'HomeController',
      controllerAs: 'home',
      templateUrl: 'home/home.html'
    };
  }
})();
