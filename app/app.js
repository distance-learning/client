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
        'distanceLearning.users'
      ])
      .constant('server_host', 'http://distance-learning.herokuapp.com/')
      .run(function($rootScope, $location,
                    ProfileUtils){
        var routesPermissionAdmin = [
          /^\/admin\/users$/
        ];

        $rootScope.$on('$routeChangeStart', function () {
          var path = $location.url();

          for (var i in routesPermissionAdmin) {
            if (routesPermissionAdmin[i].test(path)) {
              ProfileUtils.getUserInfo()
                  .then(function (ok) {
                    if (ok.role != 'admin') {
                      $location.path('/home');
                    }
                  });
            }
          }
        });
      });
})();
