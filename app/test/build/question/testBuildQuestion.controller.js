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
    vm.loading = true;
    vm.removeFileIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.addAnswerFileIconURL = './assests/images/ic_add_black_18px.svg';
    var testId = $routeParams.testId;
    var questionId = $routeParams.questionId;
    vm.question = {
      id: questionId,
      testId: testId,
      name: 'Запитання',
      type: 'single',
      file: undefined,
      answers: [
        {
          id: 0,
          name: 'Відповідь',
          isCorrectly: false
        }
      ]
    };

    var uploader = vm.uploader = new FileUploader({ autoUpload: true });
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

            vm.loading = false;
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
          if (!newName) { vm.question.answers[i].name = 'Відповідь'; }
          else { vm.question.answers[i].name = newName; }
        }
      }
    };

    vm.createQuestion = function () {
      vm.loading = true;

      var countSelectedAnswer = 0;
      for(var i in vm.question.answers) {
        if (vm.question.answers[i].isCorrectly) {
          countSelectedAnswer++;
        }
      }

      vm.question.type = countSelectedAnswer == 1 ? 'single' : 'multiSelect';

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
      var answer = {
        id: vm.question.answers.length,
        name: 'Відповідь',
        isCorrectly: false
      };

      vm.question.answers.push(answer);
    };
  }
})();