(function () {
  'use strict';

  angular
      .module('distanceLearning', [
        'ngMaterial',
        'ngRoute',
        'distanceLearning.auth',
        'distanceLearning.home',
        'distanceLearning.menuClient',
        'distanceLearning.news',
        'distanceLearning.faculty',
        'distanceLearning.teacher',
        'distanceLearning.contact',
        'distanceLearning.footer',
        'distanceLearning.profile',
        'distanceLearning.component'
      ])
      .constant('server_host', 'http://distance-learning.herokuapp.com/');

})();
