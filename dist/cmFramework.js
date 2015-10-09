

angular.module("cmFramework", ["cmMenu", "cmDashboard"]);


angular.module('cmFramework').directive('cmUserProfileSmall', function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmUserProfile/cmUserProfileSmallTemplate.html'
    };
});


angular.module('cmFramework').directive('cmUserProfile', function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmUserProfile/cmUserProfileTemplate.html'
    };
});
/**
 * Created by pauljones on 24/05/15.
 */


angular.module("cmFramework").directive("cmControl", function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmControl/cmControlTemplate.html'
    };
});


angular.module("cmMenu", ['wwaDashboard']);
angular.module("cmMenu").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmMenu/cmMenuGroupTemplate.html","\n<li class=\"cm-selectable-item\" ng-click=\"clicked()\" ng-class=\"{\'cm-item-horizontal\': !isVertical()}\">\n    <div class=\"cm-noselect\">\n        <i class=\"fa {{icon}} cm-menu-icon\"></i>\n        {{label}}\n        <i ng-if=\"isVertical()\"\n           class=\"fa fa-chevron-left cm-group-indicator-left\"\n           ng-class=\"{\'fa-rotate-270\': isOpen}\"></i>\n    </div>\n</li>\n\n<div ng-show=\"isOpen\" class=\"cm-subitem-section cm-fade-in-animation\" ng-class=\"{\'cm-popup-menu\': !isVertical() }\">\n    <ul ng-transclude></ul>\n</div>");
$templateCache.put("ext-modules/cmMenu/cmMenuItemTemplate.html","\n<li class=\"cm-selectable-item\" ng-class=\"{\'cm-item-horizontal\': !isVertical()}\">\n    <div class=\"cm-noselect\">\n        <i class=\"fa {{icon}} cm-menu-icon\"></i>\n        {{label}}\n    </div>\n    <i ng-if=\"isActive() && isVertical()\"\n       class=\"fa fa-2x fa-caret-left cm-menu-active-indicator\"></i>\n</li>\n\n\n");
$templateCache.put("ext-modules/cmMenu/cmMenuTemplate.html","\n<div>\n  <ul class=\"cm-menu\" ng-transclude></ul>\n    <a class=\"btn cm-menu-layout-button\" \n       ng-show=\"allowHorizontalToggle\"\n       ng-class=\"{\'cm-layout-button-horizontal\': !isVertical}\"\n       ng-click=\"toggleMenuOrientation()\">\n        <i class=\"fa\"\n           ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\"></i>\n    </a>\n</div>\n");}]);


angular.module('cmMenu').directive('cmMenuItem', function () {
    return {
        require: '^cmMenu',
        //require controller from menu

        //using isolate scope as should menu
        //This is where we specify fields from the template directive attributes
        //is framework template and menu template
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.cm-subitem-section').length > 0;
            };

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
});
(function(){


    angular.module('cmMenu').directive('cmMenuGroup', function () {
        return {
            require: '^cmMenu',
            transclude: true,
            //to use transclude you would add the ng-transclude to the parent component
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'ext-modules/cmMenu/cmMenuGroupTemplate.html',
            link: function (scope, el, attrs, ctrl) {
                scope.isOpen = false;
                scope.closeMenu = function () {
                    scope.isOpen = false;
                };
                scope.clicked = function () {
                    scope.isOpen = !scope.isOpen;

                    if (el.parents('.cm-subitem-section').length == 0)
                        scope.setSubmenuPosition();

                    ctrl.setOpenMenuScope(scope);
                };
                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.cm-subitem-section').length > 0;
                };

                scope.setSubmenuPosition = function () {
                    var pos = el.offset();
                    $('.cm-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
                };
            }
        };
    });
})();


angular.module('cmMenu').directive('cmMenu', ['$timeout', function ($timeout) {
    return {
        scope: {

        },
        //restrict: 'AE', As of 1.3 this is the default
        transclude: true,
        templateUrl: 'ext-modules/cmMenu/cmMenuTemplate.html',
        controller: 'cmMenuController',
        link: function (scope, el, attr) {
            var item = el.find('.cm-selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);


angular.module('cmMenu').controller('cmMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $scope.isVertical = false;
            $scope.openMenuScope = null;
            $scope.showMenu = true;
            $scope.allowHorizontalToggle = true;
            $scope.test = true;

            this.getActiveElement = function () {
                return $scope.activeElement;
            };

            this.setActiveElement = function (el) {
                $scope.activeElement = el;
            };

            this.isVertical = function () {
                return $scope.isVertical;
            }

            this.setRoute = function (route) {
                $rootScope.$broadcast('cm-menu-item-selected-event',
                    { route: route });
            };

            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };

            $scope.toggleMenuOrientation = function () {

                // close any open menu
                if ($scope.openMenuScope)
                    $scope.openMenuScope.closeMenu();

                $scope.isVertical = !$scope.isVertical;

                $rootScope.$broadcast('cm-menu-orientation-changed-event',
                    { isMenuVertical: $scope.isVertical });
            };

            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('cm-selectable-item'))
                        return;
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            $scope.$on('cm-menu-show', function(evt, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });
        }
    ]);
angular.module("cmFramework").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmFramework/cmFrameworkTemplate.html","﻿\n<div class=\"cm-title-bar\">\n    <div class=\"row\">\n        <div class=\"cm-logo-area col-sm-6\">\n            <img class=\"cm-icon\" ng-src=\"{{ iconFile }}\" />\n            <div class=\"cm-title-area\">\n                <p class=\"cm-logo-title\">{{ title }}</p>\n                <p class=\"cm-logo-subtitle\">{{ subtitle }}</p>\n            </div>\n\n            <div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\"\n                 class=\"cm-collacmed-menu pull-right\">\n                <button type=\"button\" class=\"btn cm-nav-button\">\n                    <i class=\"fa fa-bars\"></i>\n                </button>\n            </div>\n\n        </div>\n\n        <div class=\"cm-right-side-controls col-sm-6\">\n            <!-- <div>\n                <button class=\"btn btn-primary\">Button 1</button>\n                <button class=\"btn btn-success\">Button 2</button>\n                <button class=\"btn btn-warning\">Button 3</button>\n            </div> -->\n            <!--<cm-control></cm-control>-->\n            <!--<cm-user-profile-small></cm-user-profile-small>-->\n        </div>\n    </div>\n</div>\n\n<div class=\"cm-menu-area\"\n     ng-show=\"isMenuVisible\"\n     ng-class=\"{\'cm-menu-area-vertical\': isMenuVertical, \'cm-menu-area-horizontal\': !isMenuVertical}\">\n    <!--<cm-user-profile></cm-user-profile>-->\n    <ng-transclude></ng-transclude>\n</div>\n\n<!-- <ng-transclude></ng-transclude>-->\n\n<div ng-view class=\"cm-view\"\n        ng-class=\"{\'cm-view-full-width\': !isMenuVertical || !isMenuVisible}\">\n</div>\n\n");
$templateCache.put("ext-modules/cmFramework/cmControl/cmControlTemplate.html","<div class=\"cm-control pull-right\">\n    <i class=\"fa fa-crop\"></i>\n    <form>\n\n        <div class=\"form-group\">\n            <label>Layout</label>\n            <select class=\"form-control\" ng-model=\"layout\" ng-options=\"layout.url as layout.name for layout in layouts\"></select>\n        </div>\n    </form>\n</div>");
$templateCache.put("ext-modules/cmFramework/cmUserProfile/cmUserProfileSmallTemplate.html","\n<div class=\"cm-user-profile-small pull-right\">\n    <img src=\"images/employee-don.png\" alt=\"user image\" />\n    <span>Paul Jones</span>\n    <button class=\"btn btn-default btn-sm\">\n        <i class=\"fa fa-chevron-down\"></i>\n    </button>\n</div>\n");
$templateCache.put("ext-modules/cmFramework/cmUserProfile/cmUserProfileTemplate.html","\n<div class=\"cm-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\n    <img src=\"images/employee-don.png\" alt=\"user image\"/>\n    <div>\n        <p>Paul</p>\n        <p>Jones</p>\n        <button class=\"btn btn-default btn-sm\">\n            <i class=\"fa fa-chevron-down\"></i>\n        </button>\n    </div>\n</div>\n");}]);


angular.module("cmFramework").directive("cmFramework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@',
            route: '@'
        },
        controller: "cmFrameworkController",
        templateUrl: "ext-modules/cmFramework/cmFrameworkTemplate.html"
        
    };
});


angular.module("cmFramework").controller("cmFrameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location',
        function ($scope, $window, $timeout, $rootScope, $location) {
            //$scope.layout = 'normal';

            //$scope.layouts = [
            //    { name: 'Boring', url: 'normal' },
            //    { name: 'Circles', url: 'circle' },
            //    { name: 'In Your Face', url: 'large' }
            //];
            $scope.isMenuVisible = false;
            $scope.isMenuButtonVisible = false;
            $scope.isMenuVertical = false;

            $scope.$on('cm-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
                $location.path(data.route);
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('cm-menu-orientation-changed-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
                $timeout(function (){
                    $($window).trigger('resize');
                }, 0);
            });

            $($window).on('resize.cmFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });
            $scope.$on("$destroy", function () {
                $($window).off("resize.cmFramework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                // $scope.$apply();
            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast('cm-menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };

            $timeout(function () {
                checkWidth();
            }, 0);

        }
    ])
    ;


angular.module("cmDashboard", ["gridster", "ui.bootstrap"]);
angular.module("cmDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmDashboard/cmDashboardTemplate.html","<div class=\"cm-dashboard-header cm-menu-area-vertical\" ng-class=\" {\'cm-dashboard-header\': !isMenuVertical || !isMenuVisible}\">\n    {{ title }}\n    <div class=\"cm-dashboard-controls\">\n        <div class=\"dropdown\">\n            <button label=\"Add Board\" class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"true\">\n                <i class=\"fa fa-plus\"></i>Add\n                Add Boards\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\n                <li ng-repeat=\"widget in widgetDefinitions\">\n                    <a role=\"menuitem\" ng-click=\"addNewWidget(widget)\">{{widget.title}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div gridster=\"gridsterOpts\" class=\"grid\">\n    <ul>\n        <li gridster-item=\"item\" ng-repeat=\"item in widgets\">\n            <cm-widget-body>\n            </cm-widget-body>\n        </li>\n    </ul>\n</div>");
$templateCache.put("ext-modules/cmDashboard/cmWidgetBodyTemplate.html","<div class=\"cm-widget-body\">\n    <div class=\"cm-widget-menu-area btn-group\">\n        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\" />\n        </a>\n\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\" /></li>\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\" /></li>\n        </ul>\n    </div>\n</div>");}]);
/**
 * Created by pauljones on 2/05/15.
 */


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

                    scope.iconClicked = function () {
                        // empty body.
                        // this function is used by ng-click in the template
                        // so that icon clicks aren't intercepted by widgets
                    };
                }
            };
        }
    ]);


angular.module('cmDashboard').directive('cmDashboard',["cmMenu"], function () {
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