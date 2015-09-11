angular.module('myApp')
.provider('Weather', function() {
  var apiKey = "";

  this.setApiKey = function(key) {
    if (key) this.apiKey = key;
  };

	this.$get = function($q, $http) {
	  var self = this;
	  return {
	    getWeatherForecast: function(city) {
	      var d = $q.defer();
	      $http({
	        method: 'GET',
	        url: self.getUrl("forecast", city),
	        cache: true
	      }).success(function(data) {
	        // The wunderground API returns the 
	        // object that nests the forecasts inside
	        // the forecast.simpleforecast key
	        d.resolve(data.forecast.simpleforecast);
	      }).error(function(err) {
	        d.reject(err);
	      });
	      return d.promise;
	    }
	  }
	}
  this.getUrl = function(type, ext) {
  return "http://api.wunderground.com/api/" + 
    this.apiKey + "/" + type + "/q/" +
    ext + '.json';
	};
})
