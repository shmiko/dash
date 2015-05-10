"use strict";

angular.module('app').factory('dataService',
    ['$timeout',
        function ($timeout) {

            var locations = [
                {
                    id: 1000,
                    name: 'Los Angeles',
                    temperature: 55,
                    guides: 20,
                    rafts: 18,
                    vests: 200,
                    image: 'river1.png'
                },
                {
                    id: 1001,
                    name: 'San Fransisco',
                    temperature: 53,
                    guides: 36,
                    rafts: 22,
                    vests: 250,
                    image: 'river2.png'
                },
                {
                    id: 1002,
                    name: 'Yosemite',
                    temperature: 58,
                    guides: 56,
                    rafts: 40,
                    vests: 500,
                    image: 'river3.png'
                },
                {
                    id: 1003,
                    name: 'Las Vegas',
                    temperature: 39,
                    guides: 8,
                    rafts: 10,
                    vests: 40,
                    image: 'river4.png'
                },
                {
                    id: 1004,
                    name: 'New York',
                    temperature: 32,
                    guides: 8,
                    rafts: 8,
                    vests: 100,
                    image: 'river1.png'
                },
                {
                    id: 1005,
                    name: 'Florida',
                    temperature: 34,
                    guides: 22,
                    rafts: 12,
                    vests: 230,
                    image: 'river2.png'
                },
                {
                    id: 1006,
                    name: 'Texas',
                    temperature: 54,
                    guides: 20,
                    rafts: 24,
                    vests: 420,
                    image: 'river3.png'
                },
                {
                    id: 1007,
                    name: 'New Orleans',
                    temperature: 38,
                    guides: 12,
                    rafts: 8,
                    vests: 225,
                    image: 'river4.png'
                }
            ];

            var employees = [
                {
                    id: 5000,
                    name: 'Paul Jones',
                    location: 'Yosemite',
                    image: 'employee-andy.png'
                },
                {
                    id: 5001,
                    name: 'Lilia Jones',
                    location: 'New York',
                    image: 'employee-april.png'
                },
                {
                    id: 5002,
                    name: 'Jack Jones',
                    location: 'Texas',
                    image: 'employee-don.png'
                },
                {
                    id: 5003,
                    name: 'Wendy Jones',
                    location: 'Las Vegas',
                    image: 'employee-tom.png'
                },
                {
                    id: 5004,
                    name: 'Cats Galore',
                    location: 'New Orleans',
                    image: 'employee-kathy.png'
                }
            ];

            var getLocations = function () {
                return $timeout(function () {
                    return locations;
                }, 500);
            };

            var getLocation = function (id) {
                return $timeout(function () {
                    for (var i = 0; i < locations.length; i++)
                        if (locations[i].id == id)
                            return locations[i];
                    return undefined;
                }, 2000);
            };

            var getEmployees = function () {
                return $timeout(function () {
                    return employees;
                }, 500);
            };

            var getEmployee = function (id) {
                return $timeout(function () {
                    for (var i = 0; i < employees.length; i++)
                        if (employees[i].id == id)
                            return employees[i];
                    return undefined;
                }, 300);
            };


            return {
                getLocations: getLocations,
                getLocation: getLocation,
                getEmployees: getEmployees,
                getEmployee: getEmployee
            };
        }]);