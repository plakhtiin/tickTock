'use strict';

angular.module('app')
    .service('messageService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var messageService = {};

        messageService.sendMessage = function(pointId, msg) {
	        var deferred = $q.defer();
	        $http.post('/api/sendmessage/' + pointId + "/" + loginService.getToken(), msg)
		        .success(function (response) {
			        deferred.resolve(response);
		        })
		        .error(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
        return messageService;
    }]);