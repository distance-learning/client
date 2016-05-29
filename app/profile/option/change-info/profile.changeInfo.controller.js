(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileChangeInfoController', ProfileChangeInfoController);

  ProfileChangeInfoController.$inject = [
    '$location', '$log',
    '$mdToast',
    'FileUploader',
    'ProfileUtils', 'LoginUtils', 'dlFileUploadUtils'
  ];

  function ProfileChangeInfoController($location, $log,
                                       $mdToast,
                                       FileUploader,
                                       ProfileUtils, LoginUtils, dlFileUploadUtils) {
    var vm = this;
    vm.loading = true;
    vm.user = {};
    vm.uploader = new FileUploader({
      autoUpload: false,
      url: dlFileUploadUtils.getUploadImageProfileURL(),
      headers: {
        'Authorization': dlFileUploadUtils.getUploadHeader()
      }
    });
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = prepareToShow(ok);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileChangeInfoController.init().ProfileUtils.getUserInfo()', err);
          });
    }

    function prepareToShow(user) {
      if (user.avatar == null) { user.avatar = { path: './assests/images/nophoto_user.png' }}
      if (!user.birthday) {
        user.birthday = null;
        return user;
      }

      var date = user.birthday.split('-');
      user.birthday = new Date(date[0], date[1], date[2]);

      return user;
    }

    function prepareToSave(value) {
      if (!value) { return value; }

      value = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate();

      return value;
    }

    vm.cancel = function () {
      $location.path('/home');
    };

    vm.changeInformation = function() {
      if (vm.uploader.queue.length != 0) vm.uploader.uploadAll();
      var value  = {
        name: vm.user.name,
        surname: vm.user.surname,
        birthday: prepareToSave(vm.user.birthday),
        email: vm.user.email,
        phone: vm.user.phone
      };

      ProfileUtils.changeInfo(value)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Information was change')
                    .hideDelay(3000)
            );
            $location.path('/home');
          }, function (err) {
            $log.log('[ERROR] ProfileChangeInfoController.changeInformation().ProfileUtils.changeInfo()', err);
          });
    };
  }
})();