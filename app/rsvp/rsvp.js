'use strict';

angular.module('myApp.rsvp', ['ui.router', 'ngCookies'])

.controller('rsvpCtrl', ['$scope', '$http','$cookies', function($scope, $http, $cookies){

  console.log('controller loaded');

  $scope.submitEmail = function() {

    $http.post('/rsvp/email', {email:$scope.email}).
      success(function(data, status, headers, config) {
        //save email into the cookies
        $cookies.put('email', data);
        $scope.email = '';
      }).
      error(function(data, status, headers, config) {
        console.log('error in sending email');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

  $scope.submitRSVP = function() {

    var rsvpInfo = {
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      guests: $scope.guests
    }

    rsvpInfo.email = $cookies.get('email');

    console.log(rsvpInfo);

    $http.post('/rsvp/information', {info:rsvpInfo}).
      success(function(data, status, headers, config) {
        //clear information
        $scope.email = '';
        $scope.firstname = '';  
        $scope.lastname = '';
        $scope.guests = '';
      }).
      error(function(data, status, headers, config) {
        console.log('error in sending other information');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

}]);