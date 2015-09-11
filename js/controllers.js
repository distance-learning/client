(function(){
	angular
		.module('university.controllers', ['university.models', 'university.directives', 'angular-flash.service', 'angular-flash.flash-alert-directive'])
		.controller('NewsCtrl', function ($scope) {
			$scope.university_news = [
				{id: 1, title: 'Hello world', body: 'Hello everybody', created_at: '2015-09-01 10:20:04'},
				{id: 2, title: 'Hello world2', body: 'Hello everybody2', created_at: '2015-09-01 10:20:10'},
				{id: 3, title: 'Hello world3', body: 'Hello everybody3', created_at: '2015-09-01 10:20:12'},
			];

			$scope.faculty_news = [
				{id: 1, title: 'Hello world1_1', body: 'Hello everybody1_1', created_at: '2015-09-01 10:30:04'},
				{id: 2, title: 'Hello world1_2', body: 'Hello everybody1_2', created_at: '2015-09-01 10:30:10'},
				{id: 3, title: 'Hello world1_3', body: 'Hello everybody1_3', created_at: '2015-09-01 10:30:12'},
			];
		})
		.controller('FacultiesCtrl', ['$scope', 'findAllFaculties', function ($scope, findAllFaculties) {
			$scope.faculties = findAllFaculties();
		}])
		.controller('FacultyCtrl', ['$scope', '$routeParams', 'findFacultyById', function ($scope, $routeParams, findFacultyById) {
			$scope.faculty = findFacultyById($routeParams.facultyId);
		}])
		.controller('GroupCtrl', ['$scope', '$routeParams', 'findGroupById', function ($scope, $routeParams, findGroupById) {
			$scope.group = findGroupById($routeParams.groupId);
		}])
		.controller('AdminNewFacultyCtrl', ['$scope', '$location', 'addFaculty', 'flash', function ($scope, $location, addFaculty, flash) {
			$scope.faculty = {}

			$scope.submit = function () {
				addFaculty($scope.faculty);

				flash.success = 'Факультет успешно создан!';

				$location.path('/admin')
			}
		}]);
})();