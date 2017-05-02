/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('newUserCtrl', function ($scope) {

            var vm = this;
            vm.roles = {
                admin: 'Administrator',
                manager: 'Manager',
                user: 'User'
            };

        })
})();