(function () {
	 angular.module('university.directives', [])
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
})();