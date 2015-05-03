"use strict";

angular.module('app').controller('appController',
	[
	'$scope',
		function ($scope) {
			$scope.state = 'unauthorised';
			$scope.signIn = function () {
				$scope.state = 'authorised';
			};
		}

	]);