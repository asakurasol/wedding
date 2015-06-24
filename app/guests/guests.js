'use strict';

angular.module('myApp.guests', ['ui.router'])

.controller('GuestsCtrl', ['$location', '$anchorScroll', '$scope', '$http', function($location, $anchorScroll, $scope, $http) {
  $location.hash('menu');
  $anchorScroll();

  $scope.guests = [];

  var newGuest = {
    firstname : "Derek",
    lastname: "Wu"
  }
  $scope.guests.push(newGuest);

  $scope.submitPwd = function() {
    console.log($scope.password);
    $scope.password = "";
  };

  $scope.loadGuests = function() {
    $http.get('/guests/allguests').
    success(function(data){
      $scope.guests = data;
    }).
    error(function(data){
      console.log('error loading guests', data)
    })
  };


  $scope.changePermission = function(email){
    console.log('email', email);

    $http.post('/guests/changePermission', {email:email}).
    success(function(data){
      $scope.loadGuests()
    }).
    error(function(data){
      console.log('error loading guests', data)
    })
  }
  
  $scope.loadGuests();
}]);