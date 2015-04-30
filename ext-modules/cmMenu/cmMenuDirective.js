/**
 * Created by pauljones on 1/05/15.
 */
"use strict";

angular.module('cmMenu').directive('cmMenu',function(){
    return {
        scope:{

        },
        transclude: true,
        templateUrl: 'ext-modules/cmMenu/cmMenuTemplate.html',
        controller: 'cmMenuController',
        link: function(scope,el,attr){

        }
    };
});
