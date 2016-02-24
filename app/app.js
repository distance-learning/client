(function () {
  'use strict';

  angular
      .module('distanceLearning', [
        'ngMaterial',
        'ngRoute',
        'satellizer',
        'distanceLearning.auth',
        'distanceLearning.home',
        'distanceLearning.menu',
        'distanceLearning.news',
        'distanceLearning.faculty',
        'distanceLearning.teacher',
        'distanceLearning.contact',
        'distanceLearning.footer',
        'distanceLearning.profile',
        'distanceLearning.component',
        'distanceLearning.users',
        'distanceLearning.test'
      ])
      .constant('server_host', 'http://distance-learning.herokuapp.com/');
})();
