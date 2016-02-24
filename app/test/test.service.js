(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .factory('TestUtils', TestUtils);

  TestUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function TestUtils($q, $http,
                        server_host) {
    var service = {};

    return service;
  }
})();


