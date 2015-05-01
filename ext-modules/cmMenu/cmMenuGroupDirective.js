/**
 * Created by pauljones on 1/05/15.
 */
"use strict";

angular.module('cmMenu').directive('cmMenuGroup', function(){
    return {
        require: '^cmMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuGroupTemplate.html',
        link: function(scope, el, attrs, ctrl){
            scope.isOpen = false;
            scope.closeMenu = function(){
                scope.isOpen = false;
            };
            scope.clicked = function(){
                scope.isOpen = !scope.isOpen;
            };
        }
    };
});
