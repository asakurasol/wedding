'use strict';

angular.module('myApp.directions', ['ui.router'])

.controller('DirectionsCtrl', ['$location', '$anchorScroll', function($location, $anchorScroll) {
  $location.hash('menu');
  $anchorScroll();
}]);