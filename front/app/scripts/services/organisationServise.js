'use strict';

angular.module('app')
    .service('organisationService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var organisationService = {};

        organisationService.getPoints = function(orgId, date) {
            var deferred = $q.defer();
            $http.get('/api/organisation/points/' + orgId+ "/" + loginService.getToken())
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

         organisationService.updatePoint = function(pointId, data) {
             var deferred = $q.defer();
             $http.post('/api/updatepoint/' + pointId+ "/" + loginService.getToken(), data)
                 .success(function (response) {
                     deferred.resolve(response);
                 })
                 .error(function (error) {
                     deferred.reject(error);
                 });
             return deferred.promise;
        };

        organisationService.getOrganization = function(orgId, date) {
            var deferred = $q.defer();
            $http.get('/api/organization/' + orgId +  "/" + loginService.getToken())
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        organisationService.getOrganizations = function(userId) {
            var deferred = $q.defer();
            $http.get('/api/organizations/' + userId +  "/" + loginService.getToken())
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        return organisationService;
    }]);