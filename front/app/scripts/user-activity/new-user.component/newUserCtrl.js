/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('newUserCtrl', function ($scope, mainService) {

            var vm = this;
            vm.user = {};
            vm.roles = {
                admin: 'Administrator',
                manager: 'Manager',
                user: 'User'
            };
            vm.createUser = createUser;

            function createUser(){
	            mainService.createUser(vm.user)
            }

        })
})();