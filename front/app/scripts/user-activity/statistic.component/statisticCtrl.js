/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('statisticCtrl', function ($scope) {

            var vm = this;
            vm.dateFormat = 'MMM dd, yyyy';
            vm.currentDay = new Date();
            vm.popup = {
                opened: false
            };
            vm.imagesStat = new Array(48);
            _.fill(vm.imagesStat, {name: "assets/OfficeTime_icon_64.png", time: moment().seconds()}, 0, 48);
        });
})();