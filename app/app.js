'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.story',
  'myApp.rsvp',
  'ngCookies'
])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/story");
  //
  // Now set up the states
  $stateProvider
    .state('story', {
      url: "/story",
      templateUrl: "story/view1.html"
    })
    .state('rsvp', {
      url: "/rsvp",
      templateUrl: "rsvp/rsvp.html",
      controller: 'rsvpCtrl'
    })

});
