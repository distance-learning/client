(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .directive('profileTeacher', profileTeacher);

  profileTeacher.$inject = [];

  function profileTeacher() {
    return {
      replace: true,
      controller: 'ProfileTeacherController',
      controllerAs: 'profileTeacher',
      templateUrl: 'profile/teacher/profileTeacher.html'
    };
  }
})();
