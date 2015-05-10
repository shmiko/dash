"use strict";

angular.module("app").controller("calendarController",
    ['$scope',
        function($scope){

            $scope.name = "Tripper";
            $scope.eventSources = {
                events: [{
                    title: 'Event1',
                    start: '2014-07-19'
                }, {
                    title: 'Event2',
                    start: '2011-07-20'
                }],
                color: 'red', // an option!
                textColor: 'black' // an option!
            };

            /*$scope.onDayClick = function(event, date, jsEvent, view) {
             console.log("Clicked");
             $('.calendar-input').show();
             console.log(this)
             $('#create-event').click(function() {
             $scope.eventSources.events.push({
             title: 'Event3',
             start: '2014-07-20',
             end: '2014-07-22'
             });
             }
             )};*/

            $scope.calendarOptions = {
                calendar: {
                    height: 301,
                    editable: true,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'prev,next basicWeek month agendaDay'
                    },
                    dayClick: function(event, date, jsEvent, view) {
                        console.log("Clicked");
                        $('.calendar-input').show();
                        console.log(this);
                        $('#create-event').click(function() {
                            $scope.eventSources.events.push({
                                title: 'Event3',
                                start: '2014-07-20',
                                end: '2014-07-22'
                            });
                        })
                    }
                }
            };
        }
    ]);

