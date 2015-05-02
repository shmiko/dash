/**
 * Created by pauljones on 2/05/15.
 */
"use strict";

angular.module('cmDashboard').directive('cmWidgetBody',
    ['$compile',
        function ($compile) {
            return {
                templateUrl: 'ext-modules/cmDashboard/cmWidgetBodyTemplate.html',
                link: function (scope, element, attrs) {
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);
                }
            };
        }
    ]);