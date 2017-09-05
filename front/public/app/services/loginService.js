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
                    localStorage.userData = JSON.stringify(response.data.userData);
                    localStorage.authToken = response.data.result.token;
                    localStorage.tokenTime = response.data.result.time;
                    localStorage.userId = response.data.result.id;
					deferred.resolve(response.id);
				})
				.catch(function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		loginService.getUserData = function () {
            var deferred = $q.defer();
            var time = localStorage.tokenTime;
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
	            delete localStorage.userData;
	            delete localStorage.authToken;
	            delete localStorage.tokenTime;
	            delete localStorage.userId;
                $location.path("/login");
                deferred.reject();
            }else {
                var data  = JSON.parse(localStorage.userData);
                if(!data){
                    var id = localStorage.userId;
                    $http.get(config.serverUrl + '/api/user/data/' + id +'/'+ localStorage.authToken)
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
            var time = localStorage.tokenTime;
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
	            delete localStorage.userData;
	            delete localStorage.authToken;
	            delete localStorage.tokenTime;
	            delete localStorage.userId;
                $location.path("/login");
                deferred.reject();
            }else {
                deferred.resolve(localStorage.authToken);
            }
            return deferred.promise;
        };
		loginService.logOut = function () {
			delete localStorage.userData;
			delete localStorage.authToken;
			delete localStorage.tokenTime;
			delete localStorage.userId;
            $location.path("/login");
            console.log("/login");
		};

		loginService.isAuthenticated = function () {
            var time = localStorage.tokenTime;
			if (localStorage['authToken'] && time < moment().format('hh:mm:ss DD/MM/YYYY')){
				if ($location.path() == "/login") {
					$location.path("/start");
				}
			} else {
				$location.path("/login");
			}
		};


		return loginService;
	}]);
