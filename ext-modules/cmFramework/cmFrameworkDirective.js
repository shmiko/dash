/**
 * Created by pauljones on 30/04/15.
 */
"use strict";

angular.module('cmFramework').directive("cmFramework", function(){
    return {
        transclude: false,
        scope: {
            title:'@',
            subtitle:'@',
            iconFile:'@'
        },
        controller: "cmFrameworkController",
        templateUrl: "ext-modules/cmFramework/cmFrameworkTemplate.html"
    };
});
