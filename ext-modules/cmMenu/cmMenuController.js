/**
 * Created by pauljones on 1/05/15.
 */
"use strict";

angular.module('cmMenu').controller('cmMenuController',
    ['$scope','$rootScope',
        function($scope,$rootScope){

            $scope.showMenu = true;

            this.getActiveElement = function(){
                return $scope.activeElement;
            };

            this.setActiveElement = function(el) {
              $scope.activeElement = el;
            };

            this.setRoute = function (route) {
                $rootScope.$broadcast('cm-menu-item-selected-event',
                { route : route});
            };

            $scope.$on('cm-menu-show', function(evt,data){
                $scope.showMenu = data.show;
            });
        }
    ]);
