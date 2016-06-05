(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('TeacherOptions', TeacherOptions);

  TeacherOptions.$inject = [
    '$mdBottomSheet'
  ];

  function TeacherOptions($mdBottomSheet) {
    var vm = this;
    vm.options = [
      {
        name: 'Створити тест',
        icon: '../assests/images/ic_perm_media_black_24px.svg',
        value: 'test'
      },
      {
        name: 'Створити модуль',
        icon: '../assests/images/ic_account_balance_black_24px.svg',
        value: 'module'
      },
      {
        name: 'Файловий менеджер',
        icon: '../assests/images/ic_insert_drive_file_black_24px.svg',
        value: 'file'
      }
    ];

    vm.items = [
      {
        name: 'Заголовок',
        icon: '../assests/images/ic_title_black_24px.svg',
        value: 'title'
      },
      {
        name: 'Контент',
        icon: '../assests/images/ic_font_download_black_24px.svg',
        value: 'content'
      }
    ];

    vm.selectOption = function (index) {
      $mdBottomSheet.hide(vm.options[index]);
    };

    vm.listItemClick = function (index) {
      $mdBottomSheet.hide(vm.items[index]);
    };
  }
})();
