(function () {
  'use strict';

  angular
      .module('distanceLearning.component.calendar')
      .controller('CalendarController', CalendarController);

  CalendarController.$inject = [];

  function CalendarController() {
    var vm = this;
    vm.date = {};
    vm.daysOfMonth = [];

    setToday();
    function setToday() {
      var now = new Date();
      vm.date.day = now.getDate();
      vm.date.month = now.getMonth() + 1;
      vm.date.year = now.getYear();

      if (vm.date.year < 2000)
        vm.date.year = vm.date.year + 1900;

      displayCalendar(vm.date.month, vm.date.year);
    }

    vm.selectDate = function (day) {
      console.log(day);
    };

    vm.setPreviousMonth = function () {
      if (vm.date.month == 0) {
        vm.date.month = 11;
        if (vm.date.year > 1000) {
          vm.date.year--;
        }
      } else {
        vm.date.month--;
      }

      displayCalendar(vm.date.month, vm.date.year);
    };

    vm.setNextMonth = function () {
      if (vm.date.month == 11) {
        vm.date.month = 0;
        vm.date.year++;
      } else {
        vm.date.month++;
      }

      displayCalendar(vm.date.month, vm.date.year);
    };

    function displayCalendar(month, year) {
      var counterWeeks = 0;
      vm.daysOfMonth = [];

      var days = getDaysInMonth(month + 1, year);
      var firstOfMonth = new Date(year, month, 1);
      var startingPos = firstOfMonth.getDay();
      days += startingPos;

      for (var i = 0; i < startingPos; i++) {
        if (i % 7 == 0) {
          counterWeeks++;
          vm.daysOfMonth[counterWeeks] = [];
        }
        vm.daysOfMonth[counterWeeks].push({value: '   '});
      }

      for (var i = startingPos; i < days; i++) {
        var value = {};
        if (i % 7 == 0) {
          counterWeeks++;
          vm.daysOfMonth[counterWeeks] = [];
        }
        if (i - startingPos + 1 < 10) {
          value.value = '0' + (i - startingPos + 1) + ' ';
        } else {
          value.value = '' + (i - startingPos + 1) + ' ';
        }

        vm.daysOfMonth[counterWeeks].push(value);
      }
      for (var i = days; i < 42; i++) {
        if (i % 7 == 0) {
          counterWeeks++;
          vm.daysOfMonth[counterWeeks] = [];
        }

        vm.daysOfMonth[counterWeeks].push({value: '   '});
      }
    }

    function getDaysInMonth(month, year) {
      var days;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)  days = 31;
      else if (month == 4 || month == 6 || month == 9 || month == 11) days = 30;
      else if (month == 2) {
        if (isLeapYear(year)) {
          days = 29;
        }
        else {
          days = 28;
        }
      }
      return (days);
    }

    function isLeapYear(Year) {
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else {
        return (false);
      }
    }
  }
})();
