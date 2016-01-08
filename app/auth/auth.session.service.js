(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('SessionUtils', SessionUtils);

  SessionUtils.$inject = [];

  function SessionUtils() {
    var service = {
      setUser: setUser,
      getUser: getUser,
      removeUser: removeUser
    };

    function setUser(key, value) {
      return sessionStorage.setItem(key, value);
    }

    function getUser(key) {
      return sessionStorage.getItem(key);
    }

    function removeUser (key) {
      // jump to server and remove user session
      return sessionStorage.removeItem(key);
    }

    return service;
  }
})();