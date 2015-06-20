'use strict';

angular.module('myApp.story', ['ui.router'])

.controller('StoryCtrl', ['$location', '$anchorScroll', function($location, $anchorScroll) {
  $location.hash('menu');
  $anchorScroll();
}]);