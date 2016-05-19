(function () {

  'use strict';

  angular
      .module('distanceLearning.course')
      .factory('CourseUtils', CourseUtils);

  CourseUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function CourseUtils($q, $http,
                       server_host) {
    var service = {
      createCourse: createCourse,
      getCourses: getCourses,
      getCourse: getCourse,
      updateCourse: updateCourse,
      removeCourse: removeCourse
    };

    function createCourse(course) {
      var defer = $q.defer();
      var data = {
        subject_id: course.subject.id,
        teacher_id: course.teacher.id,
        group_id: course.group.id
      };

      $http.post(server_host + 'api/admin/courses', data)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getCourses(params) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/courses', { params: params })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getCourse(courseId) {
      var defer = $q.defer();

      $http.get(server_host + 'api/admin/courses/' + courseId)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function updateCourse(course) {
      var defer = $q.defer();
      var data = {
        subject_id: course.subject.id,
        teacher_id: course.teacher.id,
        group_id: course.group.id,
        is_active: course.is_active
      };

      $http.put(server_host + 'api/admin/courses/' + course.id, data)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function removeCourse(course) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/admin/courses/' + course.id)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();
