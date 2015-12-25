(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('LoginUtils', LoginUtils);

  LoginUtils.$inject = [];

  function LoginUtils() {
    var service = {};

    return service;
  }
})();