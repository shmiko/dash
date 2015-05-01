"use strict";

angular.module("cmFramework").controller("cmFrameworkController",
    ['$scope', '$rootScope', '$window', '$timeout',
        function ($scope, $rootScope, $window, $timeout) {

            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;

            $scope.$on('cm-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('cm-menu-orientation-changed-event', function(evt,data) {
                $scope.isMenuVertical = data.isMenuVertical;
            });

            $($window).on('resize.cmFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });
            $scope.$on("$destroy", function () {
                $($window).off("resize.cmFramework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                $scope.$apply();
            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast('cm-menu-show',
                    {
                        show: $scope.isMenuVisible
                    });
            };

            $timeout(function () {
                checkWidth();
            }, 0);

        }
    ]);