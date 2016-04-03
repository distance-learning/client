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
      createTest: createTest,
      createQuestion: createQuestion,
      updateQuestion: updateQuestion
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

    return service;
  }
})();


