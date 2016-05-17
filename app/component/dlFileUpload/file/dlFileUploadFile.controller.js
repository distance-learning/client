(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .controller('dlFileUploadFileController', dlFileUploadFileController);

  dlFileUploadFileController.$inject = [
    '$log',
    'dlFileUploadUtils'
  ];

  function dlFileUploadFileController($log,
                                      dlFileUploadUtils) {
    var vm = this;
    vm.files = [];

    getFiles();
    function getFiles() {
      vm.loadng = false;

      dlFileUploadUtils.files()
          .then(function (files) {
            vm.files = files;

            vm.loadng = false;
          }, function (err) {
            $log.log('[ERROR] dlFileUploadFileController.getFiles().dlFileUploadUtils.files()', err);
          });
    }
  }
})();
