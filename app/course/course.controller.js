(function () {

  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseController', CourseController);

  CourseController.$inject = [
    'CourseUtils'
  ];

  function CourseController(CourseUtils) {
    var vm = this;

  }
})();
