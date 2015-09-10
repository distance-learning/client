(function () {
	var angularApp = angular.module('university.directives', []);

	angularApp
		.directive('clientmenu', function () {
			return {
				templateUrl: 'templates/menu.html'
			}
		})
		.directive('adminmenu', function () {
			return {
				templateUrl: 'templates/admin/menu.html'
			}
		})
})()