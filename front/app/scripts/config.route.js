/**
 * Created by nastya on 17.04.17.
 */
(function(){

    angular.module("app")
        .config([
                "$stateProvider",
                function ($stateProvider)
                {
                    $stateProvider
                        .state('start', {
                            url: '/start',
                            templateUrl: './scripts/app.component.html',
                            title: 'Start',
                            controller: 'mainCtrl'
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: './scripts/user-activity/login.component/login.component.html',
                            title: 'Statistic',
                            controller: 'loginCtrl'
                        })
                        .state('statistics', {
                            url: '/statistics',
                            templateUrl: './scripts/user-activity/statistic.component/statistic.component.html',
                            title: 'Statistic',
                            controller: 'mainCtrl'
                        })
                        .state('new-user', {
                            url: '/new-user',
                            templateUrl: './scripts/user-activity/new-user.component/new-user.component.html',
                            title: 'Statistic',
                            controller: 'mainCtrl'
                        });
                }
            ]
        );
})();

