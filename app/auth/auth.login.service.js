(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('LoginUtils', LoginUtils);

  LoginUtils.$inject = [
    '$q', '$http',
    '$auth', 'server_host'
  ];

  function LoginUtils($q, $http,
                      $auth, server_host) {
    var userInfo = null;
    var service = {
      login: login,
      reLogin: reLogin,
      logout: logout,
      isLogged: isLogged,
      signUp: signUp,
      userProfile: userProfile,
      getUserRole: getUserRole
    };

    function login(user) {
      var defer = $q.defer();

      $auth.login(user)
          .then(function (ok) {
            userInfo = ok.data.user;
            setUserRole('role', userInfo.role);
            setUserCred(user.email, user.password);

            defer.resolve(ok);
          }, function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function reLogin() {
      return getUserCred();
    }

    function logout() {
      // TODO: go to server & logout
      userInfo = null;
      removeUser();

      $auth.logout();
    }

    function isLogged() {
      return $auth.isAuthenticated();
    }

    function signUp(value) {
      var deferred = $q.defer();
      var user = {
        name: value.name,
        surname: value.surname,
        password: value.password,
        password_confirmation: value.password_confirmation,
        phone: value.phone,
        email: value.email
      };

      $auth.signup(user)
          .then(function (ok) {
            userInfo = ok.data.user;
            setUserRole('role', userInfo.role);
            setUserCred(user.email, user.password);

            deferred.resolve(ok);
          })
          .catch(function (err) {
            deferred.reject(err);
          });

      return deferred.promise;
    }

    function userProfile() {
      var defer = $q.defer();

      if ($auth.isAuthenticated()) {
        if (!userInfo) {

          $http.get(server_host + 'api/auth/user')
              .success(function (ok, status, headers, config) {
                var refreshToken = headers('authorization');
                refreshToken = refreshToken.replace('Bearer ', '');
                $auth.setToken(refreshToken);

                userInfo = ok;
                setUserRole('role', userInfo.role);

                defer.resolve(ok);
              })
              .error(function (err, status, headers, config) {
                defer.reject(err);
              });

        } else {
          defer.resolve(userInfo);
        }

        return defer.promise;
      }

      defer.reject();
      return defer.promise;
    }

    function setUserRole(key, value) {
      return sessionStorage.setItem(key, value);
    }

    function getUserRole() {
      return sessionStorage.getItem('role');
    }

    function getUserCred() {
      var user = {
        email: sessionStorage.getItem('email'),
        password: sessionStorage.getItem('password')
      };

      return user;
    }

    function setUserCred(email, password) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
    }

    function removeUser() {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('role');
    }

    return service;
  }
})();
