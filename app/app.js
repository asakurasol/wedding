'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.story',
  'myApp.rsvp',
  'myApp.directions',
  'ngCookies',
  'link'
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
     $stateProvider.state('directions', {
      url: "/directions",
      templateUrl: "directions/directions.html",
      controller: 'DirectionsCtrl'
    })
     $stateProvider.state('rsvp', {
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
        console.log(location);
        $location.hash(location);
        $anchorScroll();
    });

  };
});

angular.module('link', []).
  directive('activeLink', ['$location', function(location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function(newPath) {
          console.log('triggered new path', newPath);
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);
