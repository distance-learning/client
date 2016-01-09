(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileStudentController', ProfileStudentController);

  ProfileStudentController.$inject = [];

  function ProfileStudentController() {
    var vm = this;
    vm.user = {
      name: 'Constantine',
      surname: 'Zarzhytskyy',
      avatar: 'assests/images/user_tmp.png',
      birthday: '01/01/2016',
      phone: '+380994203529',
      slug: 'Constantine_Zarzhytskyy',
      role: 'student',
      email: 'student@localhost.com'
    };
  }
})();