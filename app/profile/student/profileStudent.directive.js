(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .directive('profileStudent', profileStudent);

  profileStudent.$inject = [];

  function profileStudent() {
    return {
      replace: true,
      controller: 'ProfileStudentController',
      controllerAs: 'profileStudent',
      templateUrl: 'profile/student/profileStudent.html'
    };
  }
})();
