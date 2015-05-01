/**
 * Created by pauljones on 30/04/15.
 */
"use strict";

angular.module('cmFramework').controller("cmFrameworkController",
    [ '$scope',
        function($scope) {

            $scope.isMenuButtonVisible = true;

            $scope.$on('cm-menu-item-selected-event', function(evt,data) {
                $scope.routeString = data.route;
            });
        }
    ]);
