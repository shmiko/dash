/**
 * Created by pauljones on 1/05/15.
 */
"use strict";

angular.module('cmMenu').directive('cmMenuItem', function () {
    return {
        require: '^cmMenu',
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {

        }
    };
});