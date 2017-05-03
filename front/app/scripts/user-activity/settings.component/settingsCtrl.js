/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')

		.controller('settingsCtrl', settingsCtrl);
	settingsCtrl.$inject = ['$scope', 'mainService', '$state', '$location', 'SweetAlert'];
	function settingsCtrl($scope, mainService, $state, $location, SweetAlert) {

		var vm = this;
		vm.isMeredian = false;
		vm.intervalTime = new Date();
		vm.users = [];
		vm.clicked = '';
		vm.roles = {
			admin: 'Administrator',
			manager: 'Manager',
			user: 'User'
		};

		vm.removeUser = removeUser;

		mainService.getUsers().then(function (data) {
			vm.users = data;
		});

		function removeUser(user, index) {
			SweetAlert.swal({
					title: "Are you sure you want to delete user from system?",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55", confirmButtonText: "Yes",
					cancelButtonText: "No",
					closeOnConfirm: true,
					closeOnCancel: true
				},
				function (isConfirm) {
					if (isConfirm) {
						mainService.removeUser(user).then(function(){
							SweetAlert.swal("User was successfully deleted", "", "success");
							mainService.getUsers().then(function (data) {
								vm.users = data;
							});
						})
					}
				});
		}
	}
})();