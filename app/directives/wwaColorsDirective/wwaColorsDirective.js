"use strict";

angular.module('app')
    .directive('wwaColors', [function () {
        return {
            scope: {
            },
            //template: '<h1>Tests Page</h1>'
            templateUrl: 'app/directives/wwaColorsDirective/colors.html',
            controller: colorsController
        }
    }])
    //.controller('colorsController', ['$scope',
    //    function($scope) {
    //
    //
    //
    //    }
    //])
;