'use strict';

angular.module('myApp.rsvp', ['ui.router', 'ngCookies'])

.controller('rsvpCtrl', ['$scope', '$http','$cookies', '$location', '$anchorScroll', function($scope, $http, $cookies,$location, $anchorScroll){

  $location.hash('menu');
  $anchorScroll();

  $scope.showStepOne = true;
  $scope.showStepTwo = false;
  $scope.showStepThree = false;
  $scope.showComplete = false;
  $scope.additionalGuests = 0;
  $scope.additionalGuestInfo = [];

  $scope.submitEmail = function() {

    $http.post('/rsvp/email', {email:$scope.email}).
      success(function(data, status, headers, config) {

        console.log(data);
        //save email into the cookies
        $cookies.put('email', data);
        $scope.email = '';
        $scope.showStepOne = false;
        $scope.showStepTwo = true;
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
        $scope.showStepTwo = false;

        if($scope.guests > 0){
          $scope.showStepThree = true;
          $scope.additionalGuests = $scope.guests;
          for(var i=1; i <= $scope.guests;i++){
            var newGuest = {};
            newGuest.display = "Guest # " + i;
            newGuest.info = {firstname: '', lastname:''}; 
            $scope.additionalGuestInfo.push(newGuest);
          }
        } else {
          $scope.showComplete = true;
        }
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

  $scope.submitAdditionalGuest = function() {

    var rsvpInfo = {guestInfo: $scope.additionalGuestInfo}
    rsvpInfo.email = $cookies.get('email');

    $http.post('/rsvp/additionalguest', rsvpInfo).
      success(function(){
        $scope.showStepThree = false;
        $scope.showComplete = true;
      }).
      error(function(data, status, headers, config){
        console.log('error in submitting additional guest information')
      })
  };




}]);