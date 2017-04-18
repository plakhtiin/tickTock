'use strict';
angular.module('app')
	.service('loginService', ['$http', 'md5', '$cookies', '$location', '$q', function ($http, md5, $cookies, $location, $q) {

		var loginService = {};

		loginService.login = function (username, password, cb) {
			var deferred = $q.defer();
			var params = {
				username: username,
				password: md5.createHash(username + password)

			};

			$http.post('/api/login', params)
				.success(function (response) {
					$cookies.put("authToken", response.token);
					$cookies.put("userId", response.id);
					$location.path("/");
					// cb(response.id)
					deferred.resolve(response.id);
				})
				.error(function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		loginService.getAdminsOrganisations = function () {
			return $cookies.getObject("adminOrganisation");
		};
		loginService.getToken = function () {
			return $cookies.get("authToken");
		};
		loginService.logOut = function () {
			$cookies.remove("authToken");
			$cookies.remove("adminOrganisation");
			$location.path("/login");

		};

		loginService.isAuthenticated = function () {
			if ($cookies.get('authToken')) {
				if ($location.path() == "/login") {
					$location.path("/");
				}
			} else {
				$location.path("/login");
			}
		};


		return loginService;
	}]);
