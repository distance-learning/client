(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .factory('dlFileUploadUtils', dlFileUploadUtils);

  dlFileUploadUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function dlFileUploadUtils($q, $http,
                             server_host) {
    var service = {
      getImages: getImages,
      uploadFile: uploadFile
    };

    function getImages() {
      var defer = $q.defer();

      $http.get(server_host + 'api/files/images')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function uploadFile(file) {
      var defer = $q.defer();

      $http.post(server_host + 'api/files', file)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise();
    }

    return service;
  }
})();
