(function () {
    'use strict';
    
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ui.bootstrap',
        'angular-md5',
        'ngCookies'
    ]).run(RunApp);

    function RunApp($urlRouter, $state, $location) {
        $state.go('start');
    }

})();