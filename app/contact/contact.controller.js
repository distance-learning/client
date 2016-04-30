(function () {
  'use strict';

  angular
      .module('distanceLearning.contact')
      .controller('ContactController', ContactController);

  ContactController.$inject = [];

  function ContactController() {
    var CHU = {
      lat: 49.453373,
      lng: 32.045385
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: CHU
    });

    var marker = new google.maps.Marker({
      position: CHU,
      map: map
    });
  }
})();
