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
            var num = 423;
            vm.imagesStat = new Array(5);
            for(var i=0; i<5; i++){
	            vm.imagesStat[i] = {name: "assets/statistic/Selection_"+(num+i)+".png", time: (new Date()).getMilliseconds()}
            }
        });
})();