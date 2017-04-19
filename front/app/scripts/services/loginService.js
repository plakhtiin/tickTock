'use strict';
angular.module('app')
	.service('loginService', ['config', '$http', 'md5', '$cookies', '$location', '$q', '$rootScope', function (config, $http, md5, $cookies, $location, $q, $rootScope) {

		var loginService = {};

		loginService.login = function (username, password, cb) {
			var deferred = $q.defer();
			var params = {
				username: username,
				password: password

			};

			$http.post(config.serverUrl + '/api/login', params)
				.then(function (response) {
                    $rootScope.userData = response.data.userData;
					$cookies.putObject("userData", response.data.userData);
					$cookies.put("authToken", response.data.result.token);
					$cookies.put("tokenTime", response.data.result.time);
					$cookies.put("userId", response.data.result.id);
					// cb(response.id)
					deferred.resolve(response.id);
				})
				.catch(function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		loginService.getUserData = function () {
            var deferred = $q.defer();
            var time = $cookies.get("tokenTime");
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
                $cookies.remove("authToken");
                $cookies.remove("tokenTime");
                $location.path("/login");
                deferred.reject();
            }else {
                var data  = JSON.parse($cookies.get("userData"));
                if(!data){
                    var id = $cookies.get("userId");
                    $http.get(config.serverUrl + '/api/user/data/' + id +'/'+ loginService.getToken())
                        .then(function (response) {
                            deferred.resolve(response);
                        })
                        .catch(function (error) {
                            deferred.reject(error);
                        });
                }else {
                    deferred.resolve({data: data});
                }
            }
            return deferred.promise;
        };
		loginService.getToken = function () {
            var deferred = $q.defer();
            var time = $cookies.get("tokenTime");
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
                $cookies.remove("authToken");
                $cookies.remove("tokenTime");
                $location.path("/login");
                deferred.reject();
            }else {
                deferred.resolve($cookies.get("authToken"));
            }
            return deferred.promise;
        };
		loginService.logOut = function () {
			$cookies.remove("authToken");
            $cookies.remove("tokenTime");
            $location.path("/login");
		};

		loginService.isAuthenticated = function () {
            var time = $cookies.get("tokenTime");
			if ($cookies.get('authToken') && time < moment().format('hh:mm:ss DD/MM/YYYY')){
				if ($location.path() == "/login") {
					$location.path("/start");
				}
			} else {
				$location.path("/login");
			}
		};


		return loginService;
	}]);
