"use strict";

angular.module('app').directive('wwaCalendar', [function () {
    return {
        scope: {
        },
        //template: '<h1>Calendar Page</h1>'
        templateUrl: 'app/cal.html',
        link: function (scope) {

            scope.name = "TripStomp Smashboard";

            scope.calendarConfig = {
                height: 550,
                header: {
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                defaultView: 'agendaDay',
                firstHour: 8,
                editable: true
                //dayClick: dayClick,
                //eventClick: eventClick,
                //eventDrop: eventDrop
            };
        }
    }
}]);