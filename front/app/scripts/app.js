(function () {
    'use strict';
    
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate'
    ]).run(RunApp);

    function RunApp($urlRouter, $state, $location) {
        $state.go('start');
    }

})();