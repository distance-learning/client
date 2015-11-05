angular.module('distanceLearning.controller')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope'];

function HomeController($scope) {
  $scope.title = 'Hey people!!!';
}
