/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'loginService', '$state', '$location', 'trackingSystemService'];
	function mainCtrl($scope, loginService, $state, $location, trackingSystemService) {

		var vm = this;
		vm.userData = {};
		vm.toggleTimer = false;
		vm.logOut = logOut;

        setTimeout(function () {
            loginService.getToken().then(function (data) {
                if (!data) {
                    $state.go('login');
                    $location.path('/login');
                } else {
                    if (!localStorage.userData) {
                    	console.log(! userdata)
                        loginService.getUserData().then(function (user) {
                            localStorage.userData = JSON.stringify(user.data);
                            vm.userData = angular.copy(user.data);
                        });
                    } else {
                        vm.userData = JSON.parse(localStorage.userData);
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
			if(newVal === true)
				trackingSystemService.startTime(localStorage.userId).then(function(id){
                    localStorage.timeId = angular.copy(id);
				});
			else if(newVal === false)
				trackingSystemService.stopTime(id).then(function(){
					delete localStorage.timeId;
				});
		});

	}
})();