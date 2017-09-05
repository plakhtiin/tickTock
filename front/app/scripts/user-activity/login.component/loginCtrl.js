/**
 * Created by nastya on 17.04.17.
 */
angular
    .module('app')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', 'loginService', '$state', '$location'];
function loginCtrl($scope, loginService, $state, $location) {
    var vm = this;

    vm.userLogIn = {
        username: '',
        password: ''
    };
	loginService.getToken().then(function (data) {
		if (data) {
			$state.go('start');
			$location.path('/start');
		}
	});
    vm.submitLoginForm = function () {
        loginService.login(vm.userLogIn.username ,vm.userLogIn.password).then(function(data){
            $state.go('start');
        }, function (err) {

        });
    };
}