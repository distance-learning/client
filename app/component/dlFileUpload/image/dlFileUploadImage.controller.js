(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .controller('dlFileUploadImageController', dlFileUploadImageController);

  dlFileUploadImageController.$inject = [
    '$log',
    'dlFileUploadUtils'
  ];

  function dlFileUploadImageController($log,
                                       dlFileUploadUtils) {
    var vm = this;
    vm.images = [];
    getImages();
    function getImages() {
      vm.loadng = false;

      dlFileUploadUtils.getImages()
          .then(function (images) {
            vm.images = images;

            vm.loadng = false;
          }, function (err) {
            $log.log('[ERROR] dlFileUploadImageController.getImages().dlFileUploadUtils.getImages()', err);
          });
    }
  }
})();
