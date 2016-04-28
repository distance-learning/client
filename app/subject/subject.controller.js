(function () {

  'use strict';

  angular
      .module('distanceLearning.subject')
      .controller('SubjectController', SubjectController);

  SubjectController.$inject = [
    '$log', '$location',
    '$mdDialog',
    'SubjectUtils', 'LoginUtils', 'ProfileUtils'
  ];

  function SubjectController($log, $location,
                             $mdDialog,
                             SubjectUtils, LoginUtils, ProfileUtils) {
    var vm = this;
    var countSubjectsInPage = 15;
    vm.isOpen = true;
    vm.managerSubjectIconURL = './assests/images/ic_more_vert_black_24px.svg';
    vm.editSubjectIconURL = './assests/images/ic_border_color_black_24px.svg';
    vm.removeSubjectIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.menuSubjectIconURL = './assests/images/ic_menu_black_24px.svg';
    vm.createSubjectIconURL= './assests/images/ic_person_add_black_24px.svg';
    vm.filterSubjectIconURL = './assests/images/ic_filter_list_black_24px.svg';
    vm.loading = true;
    vm.subjects = [];
    vm.params = { page: 1 };

    init();
    function init() {
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      vm.loading = true;

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            if (ok.role != 'admin') { return $location.path('/home'); }

            getSubjects(vm.params);

            vm.loading = false;
          }, function (err) {
            $log.log('SubjectController.init().ProfileUtils.getUserInfo()', err);

            return $location.path('/home');
          });

      vm.loading = false;
    }

    function getSubjects(params) {
      vm.loading = true;

      SubjectUtils.getSubjects(params)
          .then(function (ok) {
            vm.subjects = ok.data;
            vm.total = ok.total;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] SubjectController.init().SubjectUtils.getCourses()', err);
          });
    }

    vm.createSubject = function () {
      var path = '/admin/subject/info';
      $location.path(path);
    };

    vm.editSubject = function (subject) {
      var path = '/admin/subject/info/' + subject.slug;
      $location.path(path);
    };

    vm.removeSubject = function (ev, subject) {
      $mdDialog.show({
        controller: 'SubjectDialogController',
        controllerAs: 'subjectDialog',
        templateUrl: './subject/dialog/notification.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          subject: subject
        }
      }).then(function () {
        SubjectUtils.removeSubject(subject)
            .then(function () {

              getSubjects(vm.params);
            }, function (err) {
              $log.log('[ERROR] SubjectController.removeSubject().SubjectUtils.removeSubject()', err);
            });
      });
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getSubjects(vm.params);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / countSubjectsInPage);
      if ((page % countSubjectsInPage) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };
  }
})();
