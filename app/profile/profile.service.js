(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileUtils', ProfileUtils);

  ProfileUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function ProfileUtils($q, $http,
                        server_host) {
    var service = {
      getUserInfo: getUserInfo
    };

    function getUserInfo() {

      var defer = $q.defer();
      var user = {
        name: 'Constantine',
        surname: 'Zarzhytskyy',
        avatar: 'assests/images/user_tmp.png',
        birthday: '01/01/2016',
        phone: '+380994203529',
        slug: 'Constantine_Zarzhytskyy',
        role: 'student',
        email: 'student@localhost.com'
      };

      defer.resolve(user);
      return defer.promise;

      //$http.get(server_host + 'api/auth/login')
      //    .success(function (ok) {
      //      var userId = ok._id;
      //
      //      if (userId) {
      //        SessionUtils.setUser('user', userId);
      //        defer.resolve(ok);
      //      }
      //    })
      //    .error(function (err, status) {
      //      defer.reject({
      //        data: err,
      //        status: status
      //      });
      //    });
    }

    return service;
  }
})();


