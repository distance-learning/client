(function () {
  'use strict';

  angular
      .module('distanceLearning.group')
      .controller('GroupController', GroupController);

  GroupController.$inject = [
    '$location', '$log',
    'LoginUtils', 'GroupUtils'
  ];

  function GroupController($location, $log,
                           LoginUtils, GroupUtils) {
    var vm = this;
    vm.loading = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      GroupUtils.getFacultyInfo()
          .then(function (ok) {
            vm.faculty = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] GroupController.init().GroupUtils.getFacultyInfo()', err);
          });
    }
  }
})();
