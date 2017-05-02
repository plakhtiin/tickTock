'use strict';

angular.module('app')
    .service('mainService', ['config', '$http', "loginService", "$q", "$cookies", function (config, $http, loginService, $q, $cookies) {

        var mainService = {};

        mainService.getUser = function (userId) {
            var deferred = $q.defer();
            $http.get(config.serverUrl + '/api/user/data/' + userId + '/' + localStorage.authToken)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        mainService.updateUser = function (userId, data) {
            var deferred = $q.defer();
            $http.post(config.serverUrl + '/api/updateuser/data/' + userId + '/' + localStorage.authToken, data)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        mainService.createUser = function (data) {
            var deferred = $q.defer();
            $http.post(config.serverUrl + '/api/createuser/data/'+ localStorage.authToken, data)
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
