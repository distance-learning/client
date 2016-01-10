(function () {
  'use strict';

  angular
      .module('distanceLearning.component.calendar')
      .factory('CalendarUtils', CalendarUtils);

  CalendarUtils.$inject = [];

  function CalendarUtils() {
    var daysName = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    var months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    var service = {
      setToday: setToday,
      setPreviousMonth: setPreviousMonth,
      setNextMonth: setNextMonth,
      displayCalendar: displayCalendar,
      getDaysName: getDaysName,
      selectDay: selectDay,
      addEvent: addEvent
    };

    function setToday() {
      var now = new Date();
      var date = {
        day: {
          value: now.getDate(),
          select: true
        },
        month: {
          value: now.getMonth()
        },
        year: now.getYear()
      };
      date.month.lable = changeDate(date);

      if (date.year < 2000)
        date.year = date.year + 1900;

      return date;
    }

    function changeDate(date) {
      return months[date.month.value];
    }

    function setPreviousMonth(date) {
      if (date.month.value == 0) {
        date.month.value = 11;
        if (date.year > 1000) {
          date.year--;
        }
      } else {
        date.month.value--;
      }

      date.month.lable = changeDate(date);
      return date;
    }

    function setNextMonth(date) {
      if (date.month.value == 11) {
        date.month.value = 0;
        date.year++;
      } else {
        date.month.value++;
      }

      date.month.lable = changeDate(date);
      return date;
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

    function isLeapYear(year) {
      if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
        return (true);
      } else {
        return (false);
      }
    }

    function displayCalendar(month, year) {
      var counterWeeks = 0;
      var result = [];

      var days = getDaysInMonth(month + 1, year);
      var firstOfMonth = new Date(year, month, 1);
      var startingPos = firstOfMonth.getDay();
      days += startingPos;

      for (var i = 0; i < startingPos; i++) {
        if (i % 7 == 0) {
          counterWeeks++;
          result[counterWeeks] = [];
        }

        result[counterWeeks].push({ value: '', select: false, event: [] });
      }

      var date = new Date(year, month);
      var day = date.getDate();
      for (var i = startingPos; i < days; i++) {
        var value = {
          value: day,
          select: false,
          event: []
        };
        if (i % 7 == 0) {
          counterWeeks++;
          result[counterWeeks] = [];
        }

        result[counterWeeks].push(value);
        day++;
      }

      for (var i = days; i < 42; i++) {
        if (i % 7 == 0) {
          counterWeeks++;
          result[counterWeeks] = [];
        }

        result[counterWeeks].push({ value: '', select: false, event: [] });
      }

      return result;
    }

    function getDaysName() {
      return daysName;
    }

    function selectDay(day, days) {
      for (var i in days) {
        for (var j in days[i]) {
          if (days[i][j].select) {
            days[i][j].select = false;
          }
          if (days[i][j].value === day.value) {
            days[i][j].select = true;
          }
        }
      }

      return days;
    }

    function addEvent(event, days) {
      for (var i in days) {
        for (var j in days[i]) {
          if (days[i][j].value == event.day) {
            days[i][j].event.push(event.value);
          }
        }
      }

      return days;
    }

    return service;
  }
})();
