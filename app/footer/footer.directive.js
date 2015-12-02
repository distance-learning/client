(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .directive('footer', footer);

  footer.$inject = [];

  function footer() {
    return {
      replace: true,
      controller: 'FooterController',
      controllerAs: 'footer',
      templateUrl: 'footer/footer.html'
    };
  }
})();
