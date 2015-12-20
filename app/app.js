(function () {
  'use strict';

  angular
      .module('distanceLearning', [
        'ngMaterial',
        'ngRoute',
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
