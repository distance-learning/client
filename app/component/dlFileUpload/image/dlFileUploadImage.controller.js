(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .controller('dlFileUploadImageController', dlFileUploadImageController);

  dlFileUploadImageController.$inject = [
    '$log',
    '$mdDialog', '$mdToast', 'FileUploader',
    'dlFileUploadUtils'
  ];

  function dlFileUploadImageController($log,
                                       $mdDialog, $mdToast, FileUploader,
                                       dlFileUploadUtils) {
    var vm = this;
    vm.closeIconURL = './assests/images/ic_remove_circle_black_18px.svg';
    vm.uploadFileIconURL = './assests/images/ic_cloud_upload_black_24px.svg';
    vm.cancelUploadIconURL = './assests/images/ic_remove_circle_black_18px.svg';
    vm.images = {
      data:[
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg',
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg',
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg',
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg',
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg',
        'http://distance-learning.herokuapp.com/uploads/questions/32e78e6d1f318aeaad8c57eb366574ab.jpg'
      ],
      total: 10
    };
    vm.imagesParams = {
      page: 1,
      count: 10
    };
    vm.loadingImages = false;

    vm.uploader = new FileUploader({
      autoUpload: false,
      url: dlFileUploadUtils.getUploadURL(),
      headers: dlFileUploadUtils.getUploadHeader()
    });
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    //getImages();
    function getImages() {
      vm.loadingImages = false;

      dlFileUploadUtils.getImages(vm.imagesParams)
          .then(function (images) {
            vm.images = images;

            vm.loadingImages = false;
          }, function (err) {
            $log.log('[ERROR] dlFileUploadImageController.getImages().dlFileUploadUtils.getImages()', err);
          });
    }

    vm.close = function () {
      $mdDialog.cancel();
    };

    vm.clipboardSuccess = function () {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Посилання на файл збережено в буфер')
              .hideDelay(3000)
      );
    };

    vm.jumpToPage = function (page) {
      vm.imagesParams.page = page;

      getImages();
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / vm.imagesParams.count);
      if ((page % vm.imagesParams.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.editFileName = function (fileName) {
      vm.uploader.queue[0].file.name = fileName;
    };
  }
})();
