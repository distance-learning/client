(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('SessionUtils', SessionUtils);

  SessionUtils.$inject = [];

  function SessionUtils() {
    var service = {};

    return service;
  }
})();