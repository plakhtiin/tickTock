'use strict';

angular.module('app')
    .service('trackingSystemService', ['$http', 'loginService', 'config', '$q', '$rootScope', function($http, loginService, config, $q, $rootScope) {

        var trackingSystemService = {};

        trackingSystemService.startTime = function(id) {
	        var deferred = $q.defer();
            var url = config.serverUrl + '/api/schedule/start/'+ id +'/' + $rootScope.authToken;
	        $http.post(url)
		        .then(function (response) {
			        $rootScope.userData = response.data.userData;
			        $rootScope.authToken = response.data.result.token;
			        $rootScope.tokenTime = response.data.result.time;
			        $rootScope.userId = response.data.result.id;
			        deferred.resolve(response.id);
		        })
		        .catch(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
        trackingSystemService.stopTime = function(id) {
	        var deferred = $q.defer();
            var url = config.serverUrl + '/api/schedule/start/'+ id +'/' + $rootScope.authToken;
	        // $http.post(url)
		     //    .then(function (response) {
			 //        $rootScope.userData = response.data.userData;
			 //        $rootScope.authToken = response.data.result.token;
			 //        $rootScope.tokenTime = response.data.result.time;
			 //        $rootScope.userId = response.data.result.id;
			        deferred.resolve();
		     //    })
		     //    .catch(function (error) {
			 //        deferred.reject(error);
		     //    });
	        return deferred.promise;
        };

        trackingSystemService.updateOrganisation = function(data) {
            return $http({
                url: '/api/updateOrganisation/' + loginService.getToken(),
                method: 'POST',
                data: data
            });
        };

        trackingSystemService.getWeekdaysUsers = function(idOrganisation, date) {
            return $http({
                url: "/api/getWeekdaysUsers/" + loginService.getToken() + "/" + idOrganisation + "/" + date.toString(),
                method: "get"
            });
        };


        return trackingSystemService;
    }]);
