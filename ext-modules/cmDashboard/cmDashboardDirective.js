"use strict";

angular.module('cmDashboard').directive('cmDashboard', function () {
    return {
        templateUrl: 'ext-modules/cmDashboard/cmDashboardTemplate.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget.settings);
                scope.widgets.push(newWidget);
            }
        }
    };
});