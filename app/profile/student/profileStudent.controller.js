(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileStudentController', ProfileStudentController);

  ProfileStudentController.$inject = [
      '$log',
      'ProfileStudentUtils'
  ];

  function ProfileStudentController($log,
                                    ProfileStudentUtils) {
    var vm = this;
    vm.currentSelectedDate = {};

    ProfileStudentUtils.getUser()
        .then(function (ok) {
          vm.user = ok;
        }, function (err) {
          $log.log('[ERROR] ProfileStudentController.ProfileStudentUtils.getUser() ', err);
        });

    ProfileStudentUtils.getSubjects()
        .then(function (ok) {
          vm.subjects = ok;
        }, function (err) {
          $log.log('[ERROR] ProfileStudentController.ProfileStudentUtils.getUser() ', err);
        });
  }
})();