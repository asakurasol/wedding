'use strict';

angular.module('myApp.story', ['ui.router'])

.controller('StoryCtrl', ['$location', '$anchorScroll', '$scope', '$cookies', '$http', function($location, $anchorScroll, $scope, $cookies, $http) {
  $location.hash('menu');
  $anchorScroll();

  $scope.storyIndex = [true,false,false,false,false,false];
  $scope.currentStory = 0;
  $scope.hasPermission = true;

  $scope.nextStory = function(){
    $scope.storyIndex[$scope.currentStory] = false;
    $scope.currentStory++;
    if($scope.currentStory > 5){
      $scope.currentStory = $scope.currentStory - 6;
    }
    $scope.storyIndex[$scope.currentStory] = true;
  }

  $scope.getPermission = function() {
    console.log($cookies.get('email'));
    var email = $cookies.get('email');
    $http.post('/guests/hasPermission', {email:email}).
    success(function(data){
      console.log('success', data);
      $scope.hasPermission = data.permission;
    }).
    error(function(error){
      console.log(error)
    })
  };

  $scope.getPermission();


}]);