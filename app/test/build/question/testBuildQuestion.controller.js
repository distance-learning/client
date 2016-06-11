(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildQuestionController', TestBuildQuestionController);

  TestBuildQuestionController.$inject = [
    '$log', '$location', '$routeParams',
    '$mdSidenav', '$mdDialog',
    'ProfileUtils', 'LoginUtils', 'TestUtils'
  ];

  function TestBuildQuestionController($log, $location, $routeParams,
                                       $mdSidenav, $mdDialog,
                                       ProfileUtils, LoginUtils, TestUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    var questionId = $routeParams.questionId;
    var countAnswers = 0;
    vm.targetType = {
      question: 'question',
      answer: 'answer'
    };
    vm.loading = true;
    vm.removeFileIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.cancelIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.addAnswerFileIconURL = './assests/images/ic_add_black_18px.svg';
    vm.saveIconURL = './assests/images/ic_save_black_24px.svg';
    vm.CKEditorOptions = {
      language: 'uk'
    };
    vm.CKEditorContent = {
      target: '',
      content: '',
      indexAnswer: 0
    };
    vm.question = {
      id: questionId,
      testId: testId,
      is_skip: false,
      is_active: true,
      name: '<p>Запитання</p>',
      type: 'single',
      answers: [
        {
          id: countAnswers,
          body: '<p>Відповідь</p>',
          is_correct: false
        }
      ]
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;

            var options = {
              testId: testId,
              questionId: questionId
            };
            TestUtils.getQuestion(options)
                .then(function (ok) {
                  console.log(vm.question);
                  vm.question = ok;
                  vm.question.id = questionId;
                  vm.question.score = parseFloat(vm.question.score);
                  vm.question.testId = testId;

                  var nowDate = new Date();
                  nowDate.setHours(0, 0, 0, 0);
                  nowDate.setMinutes(vm.question.time / 60);
                  nowDate.setSeconds(vm.question.time % 60);
                  vm.question.time = nowDate;

                  if (!ok.name) { vm.question.name = '<p>Запитання</p>'; }
                  if (ok.answers.length === 0) {
                    vm.question.answers.push({
                      id: 0,
                      body: 'Відповідь',
                      is_correct: false
                    });
                  }

                  vm.loading = false;
                }, function (err) {
                  $log.log('[ERROR] TestBuildController.init().ProfileUtils.getUserInfo().TestUtils.getQuestion()', err);
                });
          }, function (err) {
            $log.log('[ERROR] TestBuildController.init().ProfileUtils.getUserInfo()', err);
            $location.path('/home');
          });
    }

    function clearCKEditor() {
      vm.CKEditorContent = {
        target: '',
        content: '',
        indexAnswer: 0
      };
    }

    vm.openCKEditor = function (data) {
      clearCKEditor();

      if (data.type == vm.targetType.question) {
        vm.CKEditorContent.target = vm.targetType.question;
        vm.CKEditorContent.content = vm.question.name;
      }
      if (data.type == vm.targetType.answer) {
        for(var i in vm.question.answers) {
          if (vm.question.answers[i].id == data.indexAnswer) {
            vm.CKEditorContent.target = vm.targetType.answer;
            vm.CKEditorContent.content = vm.question.answers[i].body;
            vm.CKEditorContent.indexAnswer = vm.question.answers[i].id;
          }
        }
      }

      $mdSidenav('ckeditor').toggle();
    };

    vm.editAnswerName = function (newName, answer) {
      for (var i in vm.question.answers) {
        if (vm.question.answers[i].id == answer.id) {
          if (!newName) { vm.question.answers[i].body = '<p>Відповідь</p>'; }
          else { vm.question.answers[i].body = newName; }
        }
      }
    };

    vm.saveQuestion = function () {
      vm.loading = true;

      var countSelectedAnswer = 0;
      for (var i in vm.question.answers) {
        if (vm.question.answers[i].iscorrectly) {
          countSelectedAnswer++;
        }
      }

      vm.question.type = countSelectedAnswer == 1 ? 'single' : 'multiselect';
      vm.question.time = (vm.question.time.getMinutes() * 60) + vm.question.time.getSeconds();

      TestUtils.updateQuestion(vm.question)
          .then(function (ok) {
            var path = '/test/' + testId + '/edit';
            $location.path(path);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildQuestionController.createQuestion().TestUtils.updateQuestion()', err);
          });
    };

    vm.addAnswer = function () {
      countAnswers++;
      var answer = {
        id: countAnswers,
        body: '<p>Відповідь</p>',
        is_correct: false
      };

      vm.question.answers.push(answer);
    };

    vm.removeImg = function () {
      vm.question.image = null;
    };

    vm.cancelQuestion = function () {
      var path = '/test/' + testId + '/edit';
      $location.path(path);
    };

    vm.saveCKEditorContent = function () {
      if (vm.CKEditorContent.target == vm.targetType.question) {
        vm.question.name = vm.CKEditorContent.content;
      }
      if (vm.CKEditorContent.target == vm.targetType.answer) {
        for(var i in vm.question.answers) {
          if (vm.question.answers[i].id == vm.CKEditorContent.indexAnswer) {
            vm.question.answers[i].body = vm.CKEditorContent.content;
          }
        }
      }

      clearCKEditor();
      $mdSidenav('ckeditor').close();
    };

    vm.removeAnswer = function () {
      for (var i in vm.question.answers) {
        if (vm.CKEditorContent.indexAnswer == vm.question.answers[i].id) {
          clearCKEditor();
          $mdSidenav('ckeditor').close();

          return vm.question.answers.splice(i, 1);
        }
      }
    };

    vm.opendlFileUploadImage = function (ev) {
      $mdDialog.show({
        controller: 'dlFileUploadImageController',
        controllerAs: 'dlFileUploadImage',
        templateUrl: './component/dlFileUpload/image/dlFileUploadImage.html',
        targetEvent: ev,
        clickOutsideToClose: false
      });
    };
  }
})();