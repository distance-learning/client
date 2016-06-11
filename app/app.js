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
      .constant('server_host', 'http://distance-learning.herokuapp.com/')
      .run(['$rootScope', '$mdToast', function ($rootScope, $mdToast) {

        $rootScope.timestampToDate = function (timestamp) {
          var date = new Date(timestamp * 1000);
          var dateObject = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
          return dateObject;
        };

        $rootScope.notification = function (message, time) {
          if (!time) time = 3000;

          $mdToast.show(
              $mdToast.simple()
                  .textContent(message)
                  .hideDelay(time)
          );
        };
      }]);
})();
