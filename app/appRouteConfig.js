"use strict";

angular.module('app').config(['$routeProvider','uiGmapGoogleMapApiProvider', function ($routeProvider,uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17'
        //libraries: 'weather,geometry,visualization'
    });

    var routes = [
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/cal',
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
        },
        {
            url: '/tests',
            config: {
                template: '<wwa-tests></wwa-tests>'

            }
        }
        ,
        {
            url: '/colors',
            config: {
                template: '<wwa-colors></wwa-colors>'

            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/dashboard' });

}]);