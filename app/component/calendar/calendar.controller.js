(function () {
  'use strict';

  angular
      .module('distanceLearning.component.calendar')
      .controller('CalendarController', CalendarController);

  CalendarController.$inject = [
    '$rootScope',
    'CalendarUtils'
  ];

  function CalendarController($rootScope,
                              CalendarUtils) {
    var vm = this;
    vm.leftURLImage = '/component/calendar/images/ic_chevron_left_black_24px.svg';
    vm.rightURLImage = '/component/calendar/images/ic_chevron_right_black_24px.svg';

    $rootScope.$on('dl-calendar-setupEvents', function (event, events) {
      vm.option = events;
      addEventsInCalendar();
    });

    initCalendar();
    function initCalendar() {
      vm.date = CalendarUtils.setToday();
      vm.daysName = CalendarUtils.getDaysName();
      vm.result = CalendarUtils.displayCalendar(vm.date.month.value, vm.date.year);
      vm.selectedDay = [];
      addEventsInCalendar();
    }

    function addEventsInCalendar() {
      vm.result = CalendarUtils.displayCalendar(vm.date.month.value, vm.date.year);
      for(var i in vm.option) {
        var day = {
          id: vm.option[i].id,
          taskId: vm.option[i].attachment.id,
          day: new Date(vm.option[i].deadline).getDate(),
          value: vm.option[i].attachment.attachment.name,
          content: vm.option[i].attachment.attachment.content
        };
        if (vm.option[i].recipient) {
          day.value = '[' + vm.option[i].recipient.surname + ' ' + vm.option[i].recipient.name[0] + '] ' + day.value;
        }

        vm.result = CalendarUtils.addEvent(day, vm.result);
      }
    }

    vm.selectDate = function (day) {
      if (!day.value) { return; }

      vm.selectedDay = day.events;
      vm.result = CalendarUtils.selectDay(day, vm.result);

      $rootScope.$emit('dl-calendar-selectDate', day);
    };

    vm.selectEvent = function (event) {
      $rootScope.$emit('dl-calendar-selectEvent', event);
    };

    vm.setNextMonth = function () {
      vm.selectedDay = [];
      var date = CalendarUtils.setNextMonth(vm.date);
      vm.result = CalendarUtils.displayCalendar(date.month.value, date.year);

      $rootScope.$emit('dl-calendar-setNextMonth', date);
    };

    vm.setPreviousMonth = function () {
      vm.selectedDay = [];
      var date = CalendarUtils.setPreviousMonth(vm.date);
      vm.result = CalendarUtils.displayCalendar(date.month.value, date.year);

      $rootScope.$emit('dl-calendar-setPreviousMonth', date);
    };
  }
})();
