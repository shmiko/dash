"use strict";

angular.module('app').config(function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate","uiGmapGoogleMapApiProvider", function ($delegate,uiGmapGoogleMapApiProvider) {
        return function (exception, cause) {
            $delegate(exception, cause);
            alert(exception.message);
        };
    }]);
});