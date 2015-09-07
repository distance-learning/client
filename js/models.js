(function () {
	var angularApp = angular.module('university.models', []);

	angularApp
		.factory('findFacultyById', function() {
			var faculties = [
				{id: 1, name: 'ФОТИУС', count_people: 120},
				{id: 2, name: 'Еще один факультет', count_people: 130}
			];

			return function (facultyId) {
				for (key in faculties) {
					if (faculties[key].id == facultyId) {
						return faculties[key]
					}
				}
			}
		});
})();