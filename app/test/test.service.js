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
      getTests: getTests,
      createTest: createTest,
      createQuestion: createQuestion,
      getQuestion: getQuestion,
      updateQuestion: updateQuestion,
      updateTestInfo: updateTestInfo,
      completeTest: completeTest,
      getTestResult: getTestResult
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

    function updateQuestion(options) {
      var defer = $q.defer();

      $http.put(server_host + 'api/tests/' + options.testId + '/questions/' + options.id, { question: options })
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

    function completeTest(test) {
      var defer = $q.defer();

      // TODO: API
      //$http.post(server_host + '/api/URL', test)
      //    .success(function (ok, status, headers, config) {
      //      defer.resolve(ok);
      //    })
      //    .error(function (err, status, headers, config) {
      //      debugger;
      //      defer.reject(err);
      //    });

      defer.resolve();
      return defer.promise;
    }

    function getTestResult(testCode) {
      var defer = $q.defer();

      // TODO: need API

      return defer.promise;
    }

    return service;
  }
})();


