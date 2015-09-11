angular.module('myApp', ['ngRoute', 'treemark'])

.config(function(WeatherProvider, $routeProvider) {
  WeatherProvider.setApiKey('195d422c6846e575');
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html', 
      controller: 'MainCtrl'
    })
    .when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl'
    })
    .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function($scope, $timeout, Weather, UserService) {

    // chrome.bookmarks.getTree(function(bookmarkTree){
    // 	// console.log(JSON.stringify(bookmarkTree))
    //   $scope.data = bookmarkTree[0];
    //   console.log('data', $scope.data);

    // })






  // Build the date object
  $scope.date = {};

  // Update function
  var updateTime = function() {
  	$scope.test = 'test';
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
  }

  // Kick off the update function
  updateTime();

  $scope.weather = {}
  // Hardcode San_Francisco for now
   Weather.getWeatherForecast("CA/San_Francisco")
    .then(function(info) {
    	// console.log(info.forecastday);
      $scope.weather.forecast = info;
    });

  $scope.user = UserService.user;
    Weather.getWeatherForecast($scope.user.location)
    .then(function(info) {
      $scope.weather.forecast = info;
    });
    
});




