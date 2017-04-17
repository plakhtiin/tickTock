'use strict';

angular.module('app')
    .service('messageService', ['$http', 'loginService', function($http, loginService) {

        var messageService = {};

        messageService.sendMessage = function(pointId, msg) {
            return $http({
                url: '/api/sendmessage/' + pointId + "/" + loginService.getToken(),
                method: 'POST',
                data: msg
            });
        };
        return messageService;
    }]);