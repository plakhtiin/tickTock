/**
 * Created by nastya on 17.04.17.
 */
angular
    .module('app')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', 'loginService'];
function loginCtrl($scope, loginService) {
    var vm = this;

    vm.userLogIn = {
        email: '',
        password: ''
    };
    vm.submitLoginForm = function () {
        loginService.login(vm.userLogIn.email ,vm.userLogIn.password).then(function (data) {
           console.log(data);
        });
    }
}