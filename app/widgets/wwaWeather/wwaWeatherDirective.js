/**
 * Created by pauljones on 19/05/15.
 */
(function() {

"use strict";

var app = angular.module('app');// DIRECTIVES

app.directive("wwaWeather", function() {
    return {
        restrict: 'E',
        templateUrl: 'app/widgets/wwaWeather/wwaWeatherTemplate.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
})
    .controller('weatherController', ['$scope', 'cityService', function($scope, cityService) {

        $scope.city = cityService.city;

        $scope.$watch('city', function() {
            cityService.city = $scope.city;
        });

    }])

    .controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    $scope.convertToFahrenheit = function(degK) {

        return Math.round((1.8 * (degK - 273)) + 32);

    };

    $scope.convertToDate = function(dt) {

        return new Date(dt * 1000);

    };

}]);

} () );