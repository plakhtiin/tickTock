/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('settingsCtrl', function ($scope) {

            var vm = this;
            vm.isMeredian = false;
            vm.intervalTime = new Date();
            vm.users = new Array(48);
            _.fill(vm.users, {name: "test1 testolol"}, 0, 48);
        })
})();