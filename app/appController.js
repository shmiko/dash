"use strict";

angular.module('app').controller('appController',
	[
	'$scope',
		function ($scope) {
			$scope.state = 'authorised';
			$scope.signIn = function () {
				$scope.state = 'authorised';
			};

		}



	]);