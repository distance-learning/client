(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileAdminUtils', ProfileAdminUtils);

  ProfileAdminUtils.$inject = [
    '$q', '$http'
  ];

  function ProfileAdminUtils($q, $http) {
    var service = {};

    return service;
  }
})();


