(function(){
    angular
        .module('universityService', ['ngRoute', 'university.controllers', 'angular-flash.service', 'angular-flash.flash-alert-directive'])
        .config(['$routeProvider', '$locationProvider', 'flashProvider', function ($routeProvider, $locationProvider, flashProvider) {
            flashProvider.errorClassnames.push('alert-danger');

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
                    templateUrl: 'templates/admin/faculties/index.html'
                })
                .when('/admin/faculties/new', {
                    controller: 'AdminNewFacultyCtrl',
                    templateUrl: 'templates/admin/faculties/new.html'
                })
                .when('/admin/faculties/:facultyId/show', {})
                .when('/admin/faculties/:facultyId/edit', {})
                .when('/admin/groups', {})
                .when('/admin/groups/new', {})
                .when('/admin/groups/:groupId/show', {})
                .when('/admin/groups/:groupId/edit', {})
                .when('/admin/students/new', {})
                .when('/admin/students/:studentId/show', {})
                .when('/admin/student/:studentId/edit', {})
                .otherwise({
                    templateUrl: 'templates/errors/404.html'
                });
        }]);

})();
