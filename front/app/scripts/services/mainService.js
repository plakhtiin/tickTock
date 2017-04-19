'use strict';

angular.module('app')
    .service('mainService', ['config', '$http', "loginService", "$q",  function(config, $http, loginService, $q) {

        var mainService = {};

        mainService.getUser = function(userId) {
	        var deferred = $q.defer();
	        $http.get(config.serverUrl + '/api/user/data/' + userId +'/'+ loginService.getToken())
                .then(function (response) {
		        deferred.resolve(response);
	        })
		        .catch(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
         mainService.updateUser = function(userId, data) {
	         var deferred = $q.defer();
	         $http.post(config.serverUrl + '/api/updateuser/data/' + userId +'/'+ loginService.getToken(), data)
		         .then(function (response) {
			         deferred.resolve(response);
		         })
		         .catch(function (error) {
			         deferred.reject(error);
		         });
	         return deferred.promise;
        };

        return mainService;
    }]);
