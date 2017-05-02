/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'loginService', '$state', '$location', 'trackingSystemService', '$rootScope'];
	function mainCtrl($scope, loginService, $state, $location, trackingSystemService, $rootScope) {

		var vm = this;
		vm.userData = {};
		vm.toggleTimer = false;
		vm.logOut = logOut;

		if($rootScope.trackerSwitch)
			vm.toggleTimer = true;

        setTimeout(function () {
            loginService.getToken().then(function (data) {
                if (!data) {
                    $state.go('login');
                    $location.path('/login');
                } else {
                    if (!localStorage.userData) {
                        loginService.getUserData().then(function (user) {
                            localStorage.userData = JSON.stringify(user.data);
                            vm.userData = angular.copy(user.data);
	                        $rootScope.userData = angular.copy(vm.userData)
                        });
                    } else {
                        vm.userData = JSON.parse(localStorage.userData);
	                    $rootScope.userData = angular.copy(vm.userData)
                    }
                }
            });
        }, 500);

		function logOut() {
			loginService.logOut();
            $state.go('login');
            $location.path('/login');
		}

		$scope.$watch('vm.toggleTimer', function(newVal){
			var id = localStorage.timeId;
			if(angular.isDefined(newVal)) {
				if (newVal === true) {
					iconPath = 'assets/OfficeTime_icon.png';
					notifyText = 'Tracker is on';
					trackingSystemService.startTime(localStorage.userId).then(function (id) {
						localStorage.timeId = angular.copy(id);
					});
					$rootScope.trackerSwitch = true;
				} else if (newVal === false) {
					iconPath = "assets/icons/png/officetime_icon_128.png";
					notifyText = 'Tracker is off';
					trackingSystemService.stopTime(id).then(function () {
						delete localStorage.timeId;
					});
					$rootScope.trackerSwitch = false;
				}
				notify();
			}
		});

	}
})();