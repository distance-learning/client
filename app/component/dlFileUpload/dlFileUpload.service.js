(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .factory('dlFileUploadUtils', dlFileUploadUtils);

  dlFileUploadUtils.$inject = [
    '$q', '$http',
    '$auth',
    'server_host'
  ];

  function dlFileUploadUtils($q, $http,
                             $auth,
                             server_host) {
    var service = {
      getImages: getImages,
      getFiles: getFiles,
      getUploadURL: getUploadURL,
      getUploadImageProfileURL: getUploadImageProfileURL,
      getUploadHeader: getUploadHeader
    };

    function getImages() {
      var defer = $q.defer();

      $http.get(server_host + 'api/files/images')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getFiles() {
      var defer = $q.defer();

      $http.get(server_host + 'api/files')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getUploadURL() {
      return server_host + 'api/files';
    }

    function getUploadImageProfileURL() {
      return server_host + 'api/user/profile/image';
    }

    function getUploadHeader() {
      return 'Bearer ' + $auth.getToken()
    }

    return service;
  }
})();