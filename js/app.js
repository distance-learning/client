(function(){
    var angularApp = angular
        .module('universityService', ['ngRoute', 'university.controllers']);
    
    angularApp.config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
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
            .otherwise({
                templateUrl: 'templates/errors/404.html'
            });
    }
})();
