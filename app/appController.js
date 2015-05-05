"use strict";

angular.module('app').controller('appController',
	[
	'$scope','$mdSidenav',
		function ($scope,$mdSidenav) {
			$scope.state = 'unauthorised';
			$scope.signIn = function () {
				$scope.state = 'authorised';
			};
			$scope.toggleSidenav = function(menuId) {
				$mdSidenav(menuId).toggle();
			};
		}



	]);