/**
 * Created by nastya on 17.04.17.
 */
angular
    .module('app')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', 'loginService', '$state'];
function loginCtrl($scope, loginService, $state) {
    var vm = this;

    vm.userLogIn = {
        username: '',
        password: ''
    };
    vm.submitLoginForm = function () {
        loginService.login(vm.userLogIn.username ,vm.userLogIn.password).then(function(data){
            $state.go('start');
        }, function (err) {

        });
    };
}