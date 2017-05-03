(function () {
    'use strict';
    
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ui.bootstrap',
        'angular-md5',
        'ngCookies',
        'uiSwitch',
        'oitozero.ngSweetAlert'
    ]).run(RunApp).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    function RunApp($urlRouter, $state, $location) {
        $state.go('login');
        $location.path("/login");
    }

})();