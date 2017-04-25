/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'loginService', '$state', '$rootScope', 'trackingSystemService'];
	function mainCtrl($scope, loginService, $state, $rootScope, trackingSystemService) {

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

		$scope.$watch('vm.toggleTimer', function(newVal){
			var id = $rootScope.timeId;
			if(newVal === true)
				trackingSystemService.startTime($rootScope.userId).then(function(id){
					$rootScope.timeId = angular.copy(id);
				});
			else if(newVal === false)
				trackingSystemService.stopTime(id).then(function(){
					delete $rootScope.timeId;
				});
		});

	}
})();