(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .factory('UsersUtils', UsersUtils);

  UsersUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function UsersUtils($q, $http, server_host) {
    var service = {
    };

    return service;
  }
})();
