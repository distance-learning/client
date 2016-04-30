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
      templateUrl: 'contact/contact.html'
    };
  }
})();
