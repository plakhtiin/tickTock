/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'loginService', '$state', '$rootScope'];
	function mainCtrl($scope, loginService, $state, $rootScope) {

		var vm = this;
		vm.userData = angular.copy($rootScope.userData);
		vm.toggleTimer = false;
		vm.logOut = logOut;

		loginService.getToken().then(function (data) {
			if (!data) {
				$state.go('login');
			} else {
				if (!$rootScope.userData) {
					loginService.getUserData().then(function (user) {
						$rootScope.userData = angular.copy(user.data);
						vm.userData = angular.copy(user.data);
					});
				} else {
					vm.userData = angular.copy($rootScope.userData);
				}
			}
		});

		function logOut() {
			loginService.logOut();
		}

	}
})();