/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);
    mainCtrl.$inject = ['$scope', 'loginService', '$state'];
    function mainCtrl($scope,loginService, $state) {

            var vm = this;
            loginService.getToken().then(function (data) {
                if(!data) $state.go('login');
            })
        }
})();