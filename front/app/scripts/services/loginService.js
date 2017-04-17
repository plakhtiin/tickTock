'use strict';
angular.module('app')
    .service('loginService', ['$http', 'md5', '$cookies', "$location", function($http, md5, $cookies, $location) {

        var loginService = {};

        loginService.login = function(username, password, cb) {
            var params = {
                username: username,
                password: md5.createHash(username + password)

            };

            return $http({
                    url: '/api/login',
                    method: 'POST',
                    data: params
                })
                .success(function(response) {
                    $cookies.put("authToken", response.token);
                    $cookies.put("userId", response.id);
                    $location.path("/");
                    cb(response.id)

                })
                .error(function(error) {
                    alert("ERROR! Can't get Organisations");
                });
        };

        loginService.getAdminsOrganisations = function() {
            return $cookies.getObject("adminOrganisation");
        };
        loginService.getToken = function() {
            return $cookies.get("authToken");
        };
        loginService.logOut = function() {
            $cookies.remove("authToken");
            $cookies.remove("adminOrganisation");
            $location.path("/login");

        };

        loginService.isAuthenticated = function() {
            if($cookies.get('authToken')) {
                if($location.path() == "/login") {
                    $location.path("/");
                }
            }else{
                $location.path("/login"); 
            }



            }
        

        return loginService;
    }]);
