(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildQuestionController', TestBuildQuestionController);

  TestBuildQuestionController.$inject = [
    '$log', '$location', 'FileUploader',
    'ProfileUtils', 'LoginUtils', 'TestUtils'
  ];

  function TestBuildQuestionController($log, $location, FileUploader,
                                       ProfileUtils, LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.removeFileIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.addAnswerFileIconURL = './assests/images/ic_add_black_18px.svg';
    vm.question = {
      title: 'Запитання',
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
      if (!newTitle) { vm.question.title = 'Запитання'; }
      else { vm.question.title = newTitle; }
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
      console.log(vm.uploader.queue);
    };
  }
})();