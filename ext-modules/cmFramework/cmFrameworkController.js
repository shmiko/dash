/**
 * Created by pauljones on 30/04/15.
 */
"use strict";

angular.module('cmFramework').controller("cmFrameworkController",
    [ '$scope', '$window', '$timeout',
        function($scope,$window,$timeout) {

            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;

            $scope.$on('cm-menu-item-selected-event', function(evt,data) {
                $scope.routeString = data.route;
            });

            $($window).on('resize.psFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                });
            });
            $scope.$on("$destroy", function () {
                $($window).off("resize.psFramework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $timeout(function () {
                checkWidth();
            }, 0);
        }
    ]);
