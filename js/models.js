(function () {
	var angularApp = angular.module('university.models', []);

	angularApp
		.factory('findFacultyById', function() {
			var faculties = [
				{id: 1, name: 'ФОТИУС', count_people: 120, groups: [{id: 1, name: 'КЕ-12', count_people: 13}, {id: 2, name: 'КМ-12', count_people: 15}, {id: 3, name: 'КІ-12', count_people: 17}]},
				{id: 2, name: 'Еще один факультет', count_people: 130, groups: [{id: 4, name: 'КУ-3', count_people: 8}, {id: 5, name: 'КП-1', count_people: 15}, {id: 6, name: 'КЛ-5', count_people: 3}]}
			];

			return function (facultyId) {
				for (key in faculties) {
					if (faculties[key].id == facultyId) {
						return faculties[key]
					}
				}
			}
		});

	angularApp
		.factory('findGroupById', function () {
			var groups = [
				{id: 1, name: 'КЕ-12', students: [{name: 'Валентин', surname: 'Гриневич'}, {name: 'Володимир', surname: 'Одаховський'}]}, 
				{id: 2, name: 'КМ-12', students: [{name: 'Інна', surname: 'Бакум'}, {name: 'Альона', surname: 'Гайфулина'}]}, 
				{id: 3, name: 'КІ-12', students: [{name: 'Олексій', surname: 'Вельченко'}, {name: 'Інна', surname: 'Руденко'}]}, 
				{id: 4, name: 'КС-12', students: [{name: 'Влад', surname: 'Полинько'}, {name: 'Андрій', surname: 'Лісун'}]}
			];

			return function (groupId) {
				for (key in groups) {
					if (groups[key].id == groupId) {
						return groups[key]
					}
				}
			}
		});
})();