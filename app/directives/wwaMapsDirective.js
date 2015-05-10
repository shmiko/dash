﻿"use strict";

angular.module('app').directive('wwaMaps', [function () {
    return {
        scope: {
        },
        //template: '<h1>Maps Page</h1>'
        templateUrl: 'app/map.html',
        link: function (scope) {

           // var vm = this;
            scope.title = "Tripstomp Maps";
            scope.activate = activate;
            //vm.location = initialData;
            scope.refreshMap = refreshMap;
            //vm.save = save;
            scope.title = 'Maps';//($stateParams.id ? 'Edit Location': 'Add Location');

            scope.map = {
                center: {
                    latitude: -33.561987,
                    longitude: 150.675768
                },
                zoom: 12
            };

            scope.marker = {
                id: 1,
                coords: '-33.561987,150.675768'
            };

            //activate();

            ////////////////

            function activate() {
                if (scope.location.address){
                    refreshMap();
                }
            }

            function refreshMap(){
                var geocoder = new maps.Geocoder();
                geocoder.geocode({ address: scope.location.address }, function(result){
                    if (result.length > 0) {
                        var addrLocation = result[0].geometry.location;

                        $timeout(function(){
                            scope.map.center = {
                                latitude: addrLocation.lat(),
                                longitude: addrLocation.lng()
                            };

                            scope.marker = {
                                id: 1,
                                coords: {
                                    latitude: scope.map.center.latitude,
                                    longitude: scope.map.center.longitude
                                },
                                options: {
                                    title: scope.location.name
                                }
                            };
                        }, 0);
                    }
                });
            }
        }
    }
}]);