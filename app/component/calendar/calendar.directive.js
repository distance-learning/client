(function () {
  'use strict';

  angular
      .module('distanceLearning.component.calendar')
      .directive('calendar', calendar);

  calendar.$inject = [];

  function calendar() {
    return {
      replace: true,
      controller: 'CalendarController',
      controllerAs: 'calendar',
      templateUrl: 'component/calendar/calendar.html'
    };
  }
})();
