(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileTeacherController', ProfileTeacherController);

  ProfileTeacherController.$inject = [
    '$log', '$location', '$rootScope',
    '$mdSidenav', '$mdDialog', '$mdBottomSheet',
    'ProfileUtils', 'ProfileTeacherUtils', 'LoginUtils', 'TestUtils'
  ];

  function ProfileTeacherController($log, $location, $rootScope,
                                    $mdSidenav, $mdDialog, $mdBottomSheet,
                                    ProfileUtils, ProfileTeacherUtils, LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.intervalForTask = {
      from: new Date(),
      to: new Date()
    };
    vm.loadingtargetTask = true;
    vm.currentSelectedDate = {};
    vm.subjectIconURL = '../assests/images/ic_school_black_24px.svg';
    vm.groupIconURL = '../assests/images/ic_people_black_48px.svg';
    vm.studentIconURL = '../assests/images/ic_person_outline_black_24px.svg';
    vm.saveIconURL = './assests/images/ic_save_black_24px.svg';
    vm.removeIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.moduleInfoIconURL = './assests/images/ic_mode_edit_black_24px.svg';
    vm.addModuleInfoIconURL = './assests/images/ic_add_black_18px.svg';
    vm.teacher = {
        avatar: '../assests/images/user_tmp.png',
        description: 'Викладач гуманітарних наук'
    };
    vm.targetTasks = [];
    vm.CKEditorOptions = {
      language: 'uk'
    };
    vm.CKEditorContent = {
      target: '',
      content: '',
      moduleInfo: {
        name: ''
      }
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
            item.children[j].children[z].name = item.children[j].children[z].surname + '. ' + item.children[j].children[z].name[0];
          }
        }

        result.push(item);
      }

      return result;
    }

    function getTeacherModule() {
      vm.teacherModuleLoading = true;

      ProfileTeacherUtils.getTeacherModule()
          .then(function (module) {
            vm.teacher.modules = module;

            vm.teacherModuleLoading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getTeacherModule().ProfileTeacherUtils.getTeacherModule()', err);
          });
    }

    function setupTaskForGroup(data) {
      ProfileTeacherUtils.setupTaskForGroup(data)
          .then(function (ok) {
            var message = 'Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено';
            $rootScope.notification(message);
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    function setupTaskForStudent(data) {
      ProfileTeacherUtils.setupTaskForStudent(data)
          .then(function (ok) {
            var message = 'Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено';
            $rootScope.notification(message);
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    function goToCreateTest() {
      vm.loading = true;

      TestUtils.createTest()
          .then(function (ok) {
            $location.path('/test/' + ok.code + '/edit');
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.goToCreateTest().TestUtils.createTest()', err);
          });
    }

    function openModuleCKEditor() {
      $mdSidenav('ckeditor').toggle();
    }

    function clearCKEditor() {
      vm.CKEditorContent.target = '';
      vm.CKEditorContent.content = '';
      vm.CKEditorContent.moduleInfo.name = '';
    }

    function createModule() {
      ProfileTeacherUtils.addModuleContent(vm.CKEditorContent)
          .then(function (ok) {
            clearCKEditor();

            getTeacherModule();
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.createModule().ProfileTeacherUtils.addModuleContent()', err);
          });
    }

    function updateModule() {
      ProfileTeacherUtils.updateModuleContent(vm.CKEditorContent)
          .then(function (ok) {
            clearCKEditor();

            getTeacherModule();
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.createModule().ProfileTeacherUtils.addModuleContent()', err);
          });
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
          var confirm = $mdDialog.prompt()
              .title('Новий модуль')
              .textContent('Введіть назву модуля')
              .ok('Зберегти')
              .cancel('Відмінити');
          $mdDialog.show(confirm)
              .then(function(moduleName) {
                ProfileTeacherUtils.addModuleGroup(moduleName)
                    .then(function () {
                      getTeacherModule();
                    }, function (err) {
                      $log.log('[ERROR] ProfileTeacherController.showTeacherOptions().ProfileTeacherUtils.addModuleGroup()', err);
                    });
              });
        }
      });
    };

    vm.saveCKEditorContent = function () {
      $mdSidenav('ckeditor').close();

      if (vm.CKEditorContent.target == 'new') {
        var confirm = $mdDialog.prompt()
            .title('Назва модуль')
            .textContent('Введіть назву модуля')
            .ok('Зберегти')
            .cancel('Відмінити');
        $mdDialog.show(confirm)
            .then(function(moduleName) {
              vm.CKEditorContent.moduleInfo.name = moduleName;

              createModule(vm.CKEditorContent);
            });
      } else {
        updateModule(vm.CKEditorContent);
      }
    };

    vm.showModule = function (module) {
      $mdBottomSheet.show({
        templateUrl: './profile/teacher/options/updateModule.html',
        controller: 'TeacherOptions',
        controllerAs: 'teacherOptions',
        clickOutsideToClose: true
      }).then(function(option) {
        vm.CKEditorContent.target = module.id;
        vm.CKEditorContent.content = module.content;

        if (option.value == 'content') {
          vm.CKEditorContent.moduleInfo.name= module.name;

          openModuleCKEditor();
        }
        if (option.value == 'title') {
          var confirm = $mdDialog.prompt()
              .title('Оновлення модуль')
              .textContent('Введіть назву модуля')
              .ok('Зберегти')
              .cancel('Відмінити');
          $mdDialog.show(confirm)
              .then(function(moduleName) {
                vm.CKEditorContent.moduleInfo.name = moduleName;
                vm.CKEditorContent.moduleInfo.module_group_id = module.module_group_id;

                updateModule();
              });
        }
      });
    };

    vm.showTask = function (target) {
      if (target.type != 'student') { return; }
      if (target.surname) target.name = target.surname + '. ' + target.name[0];
      vm.showTaskForStudent(target);

      $mdSidenav('targetTasks').open();
    };

    vm.showTaskForStudent = function (target) {
      vm.loadingtargetTask = true;
      vm.targetTasks = {
        name: target.name,
        type: "student",
        target: target,
        tasks: []
      };

      ProfileTeacherUtils.getTaskForStudent(target, vm.intervalForTask)
          .then(function (tasks) {
            vm.targetTasks.tasks = tasks;

            vm.loadingtargetTask = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.showTaskForGroup().ProfileTeacherUtils.getTaskForStudent()', err);
          });
    };

    vm.removeTaskFromTarget = function (task) {
      $mdDialog.show(
          $mdDialog.confirm()
              .title('Видалення')
              .textContent('Видалення завдання [' + task.attachment.name + ']')
              .ok('Підтвердити')
              .cancel('Відмінити')
      ).then(function () {
            ProfileTeacherUtils.removeTask(task)
                .then(function (ok) {
                  vm.showTask(vm.targetTasks.target);
                }, function (err) {
                  $log.log('[ERROR] ProfileTeacherController.removeTaskFromTarget(). ProfileTeacherUtils.removeTask()', err);
                });
       });
    };

    vm.showTestResult = function () {
      var path = '/test/result/1f9d41bbab98d1434c925371bf664d3e35';
      $location.path(path);
    };

    vm.addModuleInGroup = function (module) {
      vm.CKEditorContent.target = 'new';
      vm.CKEditorContent.content = 'Контент';
      vm.CKEditorContent.moduleInfo = {
        name: '',
        module_group_id: module.id
      };

      openModuleCKEditor();
    };

    vm.removeModuleContentFromGroup = function () {
      $mdSidenav('ckeditor').close();
      ProfileTeacherUtils.removeModuleFromGroup(vm.CKEditorContent.target)
          .then(function () {
            getTeacherModule();
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.removeModuleContentFromGroup().ProfileTeacherUtils.rememoveModuleFromGroup()', err);
          });
    };

    vm.updateModuleGroupName = function (newName, module) {
      ProfileTeacherUtils.updateModuleGroupName({ module_group_id: module.id, name: newName })
        .then(function () {
            getTeacherModule();
        }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.updateModuleGroupName().ProfileTeacherUtils.updateModuleGroupName()', err);
          });
    };
  }
})();