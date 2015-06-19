'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.story',
  'myApp.rsvp',
  'myApp.directions',
  'ngCookies'
])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/rsvp");
  //
  // Now set up the states
  $stateProvider
    .state('story', {
      url: "/story",
      templateUrl: "story/story.html",
      controller: 'StoryCtrl'
    })
    .state('directions', {
      url: "/directions",
      templateUrl: "directions/directions.html",
      controller: 'DirectionsCtrl'
    })
    .state('rsvp', {
      url: "/rsvp",
      templateUrl: "rsvp/rsvp.html",
      controller: 'rsvpCtrl'
    })
})
.directive('scrollTo', function ($location, $anchorScroll) {
  return function(scope, element, attrs) {

    element.bind('click', function(event) {
        event.stopPropagation();
        var off = scope.$on('$locationChangeStart', function(ev) {
            off();
            ev.preventDefault();
        });
        var location = attrs.scrollTo;
        $location.hash(location);
        $anchorScroll();
    });

  };
});
