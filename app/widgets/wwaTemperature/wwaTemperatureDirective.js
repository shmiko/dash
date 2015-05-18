"use strict";

angular.module('app')

    .directive('wwaTemperature',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'app/widgets/wwaTemperature/wwaTemperatureTemplate.html',
            //controller: 'temperatureWidgetController',
            link: function (scope, el, attrs) {
                scope.isLoaded = false;
                scope.hasError = false;
                scope.selectedLocation = null;
                
                scope.loadlocation = function () {
                    scope.hasError = false;
                    dataService.getLocation(scope.item.widgetSettings.id)
                    .then(function(data){
                        //success
                       scope.selectedLocation = data;
                       scope.isLoaded = true;
                       scope.hasError = false;
                    }, function (data) {
                        //error
                        scope.hasError = true;
                    });
                };

                scope.loadlocation();
            }
        };
}]);