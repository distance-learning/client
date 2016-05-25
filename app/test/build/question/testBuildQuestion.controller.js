(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildQuestionController', TestBuildQuestionController);

  TestBuildQuestionController.$inject = [
    '$log', '$location', '$routeParams', 'FileUploader',
    'ProfileUtils', 'LoginUtils', 'TestUtils'
  ];

  function TestBuildQuestionController($log, $location, $routeParams, FileUploader,
                                       ProfileUtils, LoginUtils, TestUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    var questionId = $routeParams.questionId;
    vm.loading = true;
    vm.removeFileIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.addAnswerFileIconURL = './assests/images/ic_add_black_18px.svg';
    vm.question = {
      id: questionId,
      testId: testId,
      name: 'Запитання',
      type: 'single',
      file: undefined,
      answers: [
        {
          id: 0,
          body: 'Відповідь',
          iscorrectly: false
        }
      ]
    };

    var uploader = vm.uploader = new FileUploader({
      autoUpload: true,
      url: 'http://distance-learning.herokuapp.com/api/tests/' + testId + '/questions/' + questionId + '/upload',
      headers: {
        'Authorization': 'Bearer ' + LoginUtils.getToken()
      }
    });
    uploader.filters.push({
      name: 'imageFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

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
                  vm.question = ok;
                  vm.question.id = questionId;
                  vm.question.testId = testId;
                  if (!ok.name) { vm.question.name = 'Запитання'; }
                  if (ok.answers.length === 0) {
                    vm.question.answers.push({
                      id: 0,
                      body: 'Відповідь',
                      iscorrectly: false
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

    vm.editQuestionTitle = function (newTitle) {
      if (!newTitle) { vm.question.name = 'Запитання'; }
      else { vm.question.name = newTitle; }
    };

    vm.editAnswerName = function (newName, answer) {
      for (var i in vm.question.answers) {
        if (vm.question.answers[i].id == answer.id) {
          if (!newName) { vm.question.answers[i].body = 'Відповідь'; }
          else { vm.question.answers[i].body = newName; }
        }
      }
    };

    vm.createQuestion = function () {
      vm.loading = true;

      var countSelectedAnswer = 0;
      for(var i in vm.question.answers) {
        if (vm.question.answers[i].iscorrectly) {
          countSelectedAnswer++;
        }
      }

      console.log(vm.uploader);
      vm.question.type = countSelectedAnswer == 1 ? 'single' : 'multiSelect';

      //TestUtils.updateQuestion(vm.question)
      //    .then(function (ok) {
      //      var path = '/test/' + testId + '/edit';
      //      $location.path(path);
      //
      //      vm.loading = false;
      //    }, function (err) {
      //      $log.log('[ERROR] TestBuildQuestionController.createQuestion().TestUtils.updateQuestion()', err);
      //    });
    };

    vm.addAnswer = function () {
      var answer = {
        id: vm.question.answers.length,
        body: 'Відповідь',
        iscorrectly: false
      };

      vm.question.answers.push(answer);
    };

    vm.removeImg = function () {
      vm.question.image = null;
    };

    vm.cancelQuestion = function () {
      var path = '/test/' + testId + '/edit';
      console.log(path);
      $location.path(path);
    };
  }
})();