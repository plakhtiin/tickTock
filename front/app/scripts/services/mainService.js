'use strict';

angular.module('app')
    .service('mainService', ['$http', "loginService", "$q",  function($http, loginService, $q) {

        var mainService = {};

        mainService.getUser = function(userId) {
	        var deferred = $q.defer();
	        $http.get('/api/user/data/' + userId +'/'+ loginService.getToken())
                .success(function (response) {
		        deferred.resolve(response);
	        })
		        .error(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
         mainService.updateUser = function(userId, data) {
	         var deferred = $q.defer();
	         $http.post( '/api/updateuser/data/' + userId +'/'+ loginService.getToken(), data)
		         .success(function (response) {
			         deferred.resolve(response);
		         })
		         .error(function (error) {
			         deferred.reject(error);
		         });
	         return deferred.promise;
        };

        return mainService;
    }]);
