"use strict";

angular.module('app').factory('dataService',
    ['$timeout',
        function ($timeout) {

            var home = [];

            var test = '';

            var locations = [
                {
                    id: 1000,
                    name: 'Los Angeles',
                    temperature: 55,
                    guides: 20,
                    rafts: 18,
                    vests: 200,
                    image: '10.jpg'
                },
                {
                    id: 1001,
                    name: 'San Fransisco',
                    temperature: 53,
                    guides: 36,
                    rafts: 22,
                    vests: 250,
                    image: '11.jpg'
                },
                {
                    id: 1002,
                    name: 'Yosemite',
                    temperature: 58,
                    guides: 56,
                    rafts: 40,
                    vests: 500,
                    image: '12.jpg'
                },
                {
                    id: 1003,
                    name: 'Las Vegas',
                    temperature: 39,
                    guides: 8,
                    rafts: 10,
                    vests: 40,
                    image: '13.jpg'
                },
                {
                    id: 1004,
                    name: 'New York',
                    temperature: 32,
                    guides: 8,
                    rafts: 8,
                    vests: 100,
                    image: '14.jpg'
                },
                {
                    id: 1005,
                    name: 'Florida',
                    temperature: 34,
                    guides: 22,
                    rafts: 12,
                    vests: 230,
                    image: '15.jpg'
                },
                {
                    id: 1006,
                    name: 'Texas',
                    temperature: 54,
                    guides: 20,
                    rafts: 24,
                    vests: 420,
                    image: '9.jpg'
                },
                {
                    id: 1007,
                    name: 'New Orleans',
                    temperature: 38,
                    guides: 12,
                    rafts: 8,
                    vests: 225,
                    image: '8.jpg'
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
                    image: 'user.jpg'
                },
                {
                    id: 5002,
                    name: 'Jack Jones',
                    location: 'Texas',
                    image: 'user2.jpg'
                },
                {
                    id: 5003,
                    name: 'Wendy Jones',
                    location: 'Las Vegas',
                    image: 'user3.jpg'
                },
                {
                    id: 5004,
                    name: 'Cats Galore',
                    location: 'New Orleans',
                    image: 'c5.jpg'
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
                }, 4000);
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