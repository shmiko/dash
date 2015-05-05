"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    var routes = [
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/calendar',
            config: {
                template: '<wwa-calendar></wwa-calendar>'
                //templateUrl: 'app/calendar.html'
            }
        },
        {
            url: '/maps',
            config: {
                template: '<wwa-maps></wwa-maps>'

            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/dashboard' });

}]);