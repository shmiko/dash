"use strict";

angular.module('app').directive('wwaDashboard', [function () {
    return {
        scope: {
        },
        template: '<cm-dashboard></cm-dashboard>',
        link: function (scope) {

            scope.title = "TripStomp Smashboard";

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: false
            };

            scope.widgetDefinitions = [
                {
                    title: 'Temperature',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Inventory',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<wwa-inventory></wwa-inventory>',
                        widgetSettings: {
                            id: 1002,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Employee',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<wwa-employee></wwa-employee>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'app/dialogs/wwaSelectEmployeeTemplate.html',
                            controller: 'wwaSelectEmployeeController'
                        }
                    }
                }
            ];

            scope.widgets = [
                //{
                //    title: 'poop',
                //    sizeX: 3,
                //    sizeY: 3,
                //    minSizeX: 2,
                //    minSizeY: 2,
                //    row: 0,
                //    col: 0,
                //    template: '<wwa-temperature></wwa-temperature>'
                //    ,widgetSettings: {
                //        id: 1000
                //    }
                //}
                //,
                //{
                //    title: 'scoop',
                //    sizeX: 5,
                //    sizeY: 3,
                //    row: 0,
                //    col: 5,
                //    template: '<wwa-employee></wwa-employee>'
                //    ,widgetSettings: {
                //        id: 5001
                //    }
                //}
                //,
                //{
                //    title: 'droop',
                //    sizeX: 5,
                //    sizeY: 3,
                //    row: 3,
                //    col: 5,
                //    template: '<wwa-inventory></wwa-inventory>'
                //    ,widgetSettings: {
                //        id: 1002
                //    }
                //}
            ];
        }
    }
}]);