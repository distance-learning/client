(function () {
  'use strict';

  angular
      .module('distanceLearning', [
        'ngMaterial',
        'ngMessages',
        'ngRoute',
        'satellizer',
        'angularInlineEdit',
        'angularFileUpload',
        'ngDraggable',
        'angular-svg-round-progressbar',
        'ngCkeditor',
        'ngSanitize',
        'angular-clipboard',
        'treeControl',
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
        'distanceLearning.test',
        'distanceLearning.group',
        'distanceLearning.course',
        'distanceLearning.subject'
      ])
      .constant('server_host', 'http://distance-learning.herokuapp.com/');
})();
