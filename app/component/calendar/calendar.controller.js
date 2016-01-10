(function () {
  'use strict';

  angular
      .module('distanceLearning.component.calendar')
      .controller('CalendarController', CalendarController);

  CalendarController.$inject = [
    'CalendarUtils'
  ];

  function CalendarController(CalendarUtils) {
    var vm = this;
    vm.leftURLImage = '/component/calendar/images/ic_chevron_left_black_24px.svg';
    vm.rightURLImage = '/component/calendar/images/ic_chevron_right_black_24px.svg';

    initCalendar();
    function initCalendar() {
      vm.date = CalendarUtils.setToday();
      vm.daysName = CalendarUtils.getDaysName();
      vm.result = CalendarUtils.displayCalendar(vm.date.month.value, vm.date.year);
    }

    vm.selectDate = function (day) {
      if (day.value) {
        vm.result = CalendarUtils.selectDay(day, vm.result);

        var event = {
          day: new Date().getDate(),
          value: 'test'
        };
        vm.result = CalendarUtils.addEvent(event, vm.result);
      }
    };

    vm.setNextMonth = function () {
      var result = CalendarUtils.setNextMonth(vm.date);

      vm.result = CalendarUtils.displayCalendar(result.month.value, result.year);
    };

    vm.setPreviousMonth = function () {
      var result = CalendarUtils.setPreviousMonth(vm.date);

      vm.result = CalendarUtils.displayCalendar(result.month.value, result.year);
    };
  }
})();
