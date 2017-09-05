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
                            controller: 'mainCtrl',
                            controllerAs: 'vm'
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: './scripts/user-activity/login.component/login.component.html',
                            title: 'Statistic',
                            controller: 'loginCtrl',
                            controllerAs: 'vm'
                        })
                        .state('statistics', {
                            url: '/statistics',
                            templateUrl: './scripts/user-activity/statistic.component/statistic.component.html',
                            title: 'Statistic',
                            controller: 'statisticCtrl',
                            controllerAs: 'vm'
                        })
                        .state('settings', {
                            url: '/settings',
                            templateUrl: './scripts/user-activity/settings.component/settings.component.html',
                            title: 'Settings',
                            controller: 'settingsCtrl',
                            controllerAs: 'vm'
                        })
                        .state('new-user', {
                            url: '/new-user',
                            templateUrl: './scripts/user-activity/new-user.component/new-user.component.html',
                            title: 'New User',
                            controller: 'newUserCtrl',
                            controllerAs: 'vm'
                        });
                }
            ]
        );
})();

