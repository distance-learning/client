(function () {
  'use strict';

  angular
      .module('distanceLearning.contact')
      .directive('contact', contact);

  contact.$inject = [];

  function contact() {
    return {
      replace: true,
      controller: 'ContactController',
      controllerAs: 'contact',
      templateUrl: 'contact/contact.html'
    };
  }
})();
