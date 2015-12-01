(function () {
  'use strict';

  angular
      .module('distanceLearning.news')
      .directive('news', news);

  news.$inject = [];

  function news() {
    return {
      replace: true,
      controller: 'NewsController',
      controllerAs: 'news',
      templateUrl: 'news/news.html'
    };
  }
})();
