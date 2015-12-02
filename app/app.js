(function () {
  'use strict';

  angular
      .module('distanceLearning', [
        'ngMaterial',
        'distanceLearning.home',
        'distanceLearning.menuClient',
        'distanceLearning.news',
        'distanceLearning.faculty',
        'distanceLearning.teacher',
        'distanceLearning.contact',
        'distanceLearning.footer'
      ])
      .constant('server_host', 'http://distance-learning.herokuapp.com/');

})();
