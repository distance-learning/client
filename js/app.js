(function(){
    var angularApp = angular
        .module('universityService', ['ngRoute', 'university.controllers']);
    
    angularApp.config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'NewsCtrl',
                templateUrl: 'templates/main.html'
            })
            .when('/faculties', {
                controller: 'FacultiesCtrl',
                templateUrl: 'templates/faculties/index.html'
            })
            .when('/faculties/:facultyId', {
                controller: 'FacultyCtrl',
                templateUrl: 'templates/faculties/show.html'
            })
            .when('/faculties/:facultyId/groups/:groupId', {
                controller: 'GroupCtrl',
                templateUrl: 'templates/faculties/groups/show.html'
            })
            .when('/admin/', {
                controller: 'FacultiesCtrl',
                templateUrl: 'templates/faculties/index.html'
            })
            .otherwise({
                templateUrl: 'templates/errors/404.html'
            });
    }
})();
