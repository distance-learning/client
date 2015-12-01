(function () {
  'use strict';

  angular
      .module('distanceLearning.news')
      .controller('NewsController', NewsController);

  NewsController.$inject = [];

  function NewsController () {
    var vm = this;
    vm.universitiesTitle = 'Університет';
    vm.facultiesTitle = 'Факультет';
    vm.universityArticles = [
      { name: 'news 1', content: 'Content for news 1'},
      { name: 'news 2', content: 'Content for news 2'},
      { name: 'news 3', content: 'Content for news 3'},
      { name: 'news 4', content: 'Content for news 4'}
    ];
  }
})();
