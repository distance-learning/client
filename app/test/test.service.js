(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .factory('TestUtils', TestUtils);

  TestUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function TestUtils($q, $http,
                     server_host) {
    var service = {
      getTest: getTest,
      getTestPass: getTestPass,
      getTests: getTests,
      createTest: createTest,
      createQuestion: createQuestion,
      getQuestion: getQuestion,
      updateQuestion: updateQuestion,
      updateTestInfo: updateTestInfo,
      completeTest: completeTest,
      getTestResult: getTestResult,
      getTestHistory: getTestHistory
    };

    function getTest(testId) {
      var defer = $q.defer();

      $http.get(server_host + 'api/tests/' + testId)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });


      return defer.promise;
    }

    function getTestPass(testId) {
      var defer = $q.defer();

      $http.get(server_host + 'api/tests/' + testId + '/passing')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getTests(params) {
      var defer = $q.defer();

      $http.get(server_host + 'api/tests', { params: params })
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function createTest() {
      var defer = $q.defer();

      $http.post(server_host + 'api/tests')
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function createQuestion(testId) {
      var defer = $q.defer();

      $http.post(server_host + 'api/tests/' + testId + '/questions')
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function getQuestion(options) {
      var defer = $q.defer();

      $http.get(server_host + 'api/tests/' + options.testId + '/questions/' + options.questionId)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function updateQuestion(question) {
      var defer = $q.defer();

      $http.put(server_host + 'api/tests/' + question.testId + '/questions/' + question.id, { question: question })
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function updateTestInfo(test) {
      var defer = $q.defer();

      $http.put(server_host + 'api/tests/' + test.code, test)
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    function completeTest(answers, testCode) {
      console.log(answers);
      var defer = $q.defer();

      $http.post(server_host + '/api/tests/' + testCode + '/check', { questions: answers })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getTestResult(testCode) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    function getTestHistory(student) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    return service;
  }
})();


