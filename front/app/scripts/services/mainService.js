'use strict';

angular.module('app')
    .service('mainService', ['$http', "loginService",  function($http, loginService) {

        var mainService = {};

        mainService.getUser = function(userId) {
            return $http({
                url: '/api/user/data/' + userId +'/'+ loginService.getToken(),
                method: 'GET',
            });
        }
         mainService.updateUser = function(userId, data) {
            return $http({
                url: '/api/updateuser/data/' + userId +'/'+ loginService.getToken(),
                method: 'POST',
                data: data
            });
        };

        return mainService;
    }]);
