/**
 * Created by pauljones on 1/05/15.
 */
"use strict";

angular.module('cmMenu').directive('cmMenuItem', function () {
    return {
        require: '^cmMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function(){
                return el === ctrl.getActiveElement();
            };

            el.on('click', function(evt){
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function (){
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
});