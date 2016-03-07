(function () {
  'use strict';

  angular
      .module('distanceLearning.group')
      .directive('groupList', groupList);

  groupList.$inject = [];

  function groupList() {
    return {
      replace: true,
      controller: 'GroupController',
      controllerAs: 'groupList',
      templateUrl: 'group/group.html'
    };
  }
})();
