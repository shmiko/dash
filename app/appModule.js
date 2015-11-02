"use strict";

angular.module("app", ["ngRoute", "cmFramework", "ngStorage", "ui.calendar", "uiGmapgoogle-maps",'ngMaterial',"ngResource","ui.bootstrap"])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('cyan');
    });

