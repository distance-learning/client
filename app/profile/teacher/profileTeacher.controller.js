(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileTeacherController', ProfileTeacherController);

  ProfileTeacherController.$inject = [
    '$log', '$location',
    '$mdSidenav', '$mdDialog', '$mdToast', '$mdBottomSheet',
    'ProfileUtils', 'ProfileTeacherUtils', 'LoginUtils', 'TestUtils'
  ];

  function ProfileTeacherController($log, $location,
                                    $mdSidenav, $mdDialog, $mdToast, $mdBottomSheet,
                                    ProfileUtils, ProfileTeacherUtils, LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.currentSelectedDate = {};
    vm.subjectIconURL = '../assests/images/ic_school_black_24px.svg';
    vm.groupIconURL = '../assests/images/ic_people_black_48px.svg';
    vm.studentIconURL = '../assests/images/ic_person_outline_black_24px.svg';
    vm.saveIconURL = './assests/images/ic_save_black_24px.svg';
    vm.moduleInfoIconURL = './assests/images/ic_mode_edit_black_24px.svg';
    vm.teacher = {
        avatar: '../assests/images/user_tmp.png',
        description: 'Викладач гуманітарних наук'
    };
    vm.CKEditorOptions = {
      language: 'uk'
    };
    vm.CKEditorContent = {
      target: '',
      content: ''
    };
    vm.treeControl = {
      data: [],
      options: {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
          ul: "outline-off",
          li: "outline-off",
          liSelected: "outline-off text-with-style",
          iExpanded: "outline-off",
          iCollapsed: "outline-off",
          iLeaf: "outline-off",
          label: "outline-off",
          labelSelected: "outline-off"
        }
      }
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (teacher) {
            vm.teacher = teacher;
            vm.teacher.avatar = './assests/images/user_tmp.png';
            vm.teacher.description = 'Викладач гуманітарних наук';

            getSubjectWithGroups();
            getTeacherModule();
          }, function (err) {
            $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
            return $location.path('/home');
          });
    }

    function getSubjectWithGroups() {
      vm.loading = true;

      ProfileTeacherUtils.getSubjectsWithGroups()
          .then(function (ok) {
            vm.treeControl.data = prepareSubjectWithGroups(ok);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getInfo().ProfileTeacherUtils.getGroups()', err);
          });
    }

    function prepareSubjectWithGroups(data) {
      var result = [];
      var item = {};

      for(var i in data) {
        item = data[i];
        item.type = 'subject';
        item.children = data[i].groups;


        for(var j in item.children) {
          item.children[j].type = 'group';
          item.children[j].children = item.children[j].students;

          for(var z in item.children[j].children) {
            item.children[j].children[z].type = 'student';
          }
        }

        result.push(item);
      }

      return result;
    }

    function getTeacherModule() {
      vm.teacherModuleLoading = true;
      vm.teacher.modules = [
        {
          id: 1,
          name: 'Module 1',
          items: [
            { id: 11, name: 'Module 1 - 1', content: 'Module 1 - 1 content' },
            { id: 12, name: 'Module 1 - 2', content: 'Module 1 - 2 content' },
            { id: 13, name: 'Module 1 - 3', content: 'Module 1 - 3 content' }
          ]
        },
        {
          id: 2,
          name: 'Module 2',
          items: [
            { id: 21, name: 'Module 2 - 1' },
            { id: 22, name: 'Module 2 - 2' },
            { id: 23, name: 'Module 2 - 3' }
          ]
        },
        {
          id: 3,
          name: 'Module 3',
          items: [
            { id: 31, name: 'Module 3- 1' },
            { id: 32, name: 'Module 3 - 2' },
            { id: 33, name: 'Module 3 - 3' }
          ]
        }
      ];
      vm.teacherModuleLoading = false;

      //ProfileTeacherUtils.getTeacherModule()
      //    .then(function (module) {
      //      vm.teacher.module = module;
      //
      //      vm.teacherModuleLoading = false;
      //    }, function (err) {
      //      $log.log('[ERROR] ProfileTeacherController.getTeacherModule().ProfileTeacherUtils.getTeacherModule()', err);
      //    });
    }

    function getTasks(group) {
      ProfileTeacherUtils.getTasks(group)
          .then(function (tasks) {
            vm.tasks = tasks;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getTasks()', err);
          });
    }

    function setupTaskForGroup(data) {
      ProfileTeacherUtils.setupTaskForGroup(data)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено')
                    .hideDelay(3000)
            );
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    function setupTaskForStudent(data) {
      ProfileTeacherUtils.setupTaskForStudent(data)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено')
                    .hideDelay(3000)
            );
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    function goToCreateTest() {
      vm.loading = true;

      TestUtils.createTest()
          .then(function (ok) {
            console.log(ok);
            $location.path('/test/' + ok.code + '/edit');
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.goToCreateTest().TestUtils.createTest()', err);
          });
    }

    function openModuleCKEditor() {
      $mdSidenav('ckeditor').toggle();
    }

    vm.onDropComplete = function (module, event, target) {
      module.target = target;

      $mdDialog.show({
            controller: 'ProfileTeacherDialogController',
            controllerAs: 'profileTeacherDialog',
            templateUrl: './profile/teacher/dialog/dialog.html',
            clickOutsideToClose:true
          }
      ).then(function (date) {
        module.deadline = date;

        if (target.type == 'group') { return setupTaskForGroup(module); }
        if (target.type == 'student') { return setupTaskForStudent(module); }
      });
    };

    vm.canNgDrop = function (node) {
      return node.type != 'subject';
    };

    vm.showTeacherOptions = function () {
      $mdBottomSheet.show({
        templateUrl: './profile/teacher/options/options.html',
        controller: 'TeacherOptions',
        controllerAs: 'teacherOptions',
        clickOutsideToClose: true
      }).then(function(option) {
        console.log(option);
        if (option.value == 'test') { return goToCreateTest(); }
        if (option.value == 'file') {
          $mdDialog.show({
            controller: 'dlFileUploadFileController',
            controllerAs: 'dlFileUploadFile',
            templateUrl: './component/dlFileUpload/file/dlFileUploadFile.html',
            clickOutsideToClose: false
          });

          return;
        }
        if (option.value == 'module') {
          vm.CKEditorContent.content = 'Контент модуля';

          return openModuleCKEditor();
        }
      });
    };

    vm.saveCKEditorContent = function () {
      $mdSidenav('ckeditor').close();




      // remove here
      vm.CKEditorContent = {
        target: '',
        content: ''
      };
      getTeacherModule();

      //ProfileTeacherUtils.addModuleContent(vm.CKEditorContent)
      //    .then(function (ok) {
      //      vm.CKEditorContent = {
      //        target: '',
      //        content: ''
      //      };
      //
      //      getTeacherModule();
      //    }, function (err) {
      //      $log.log('[ERROR] ProfileTeacherController.saveCKEditorContent().ProfileTeacherUtils.addModuleContent()', err);
      //    });
    };

    vm.showModule = function (module) {
      vm.CKEditorContent.content = module.content;
      vm.CKEditorContent.target = module.id;

      openModuleCKEditor();
    }
  }
})();