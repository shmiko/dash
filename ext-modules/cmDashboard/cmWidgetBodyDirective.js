/**
 * Created by pauljones on 2/05/15.
 */
"use strict";

angular.module('cmDashboard').directive('cmWidgetBody',
    ['$compile','$modal',
        function ($compile, $modal) {
            return {
                templateUrl: 'ext-modules/cmDashboard/cmWidgetBodyTemplate.html',
                link: function (scope, element, attrs) {
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);

                    scope.close = function () {
                        scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                    };

                    scope.settings = function () {
                        var options = {
                            templateUrl: scope.item.widgetSettings.templateUrl,
                            controller: scope.item.widgetSettings.controller,
                            scope: scope
                        };
                        $modal.open(options);

                    };
                }
            };
        }
    ]);