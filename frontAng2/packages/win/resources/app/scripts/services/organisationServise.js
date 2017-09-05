'use strict';

angular.module('app')
    .service('organisationService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var organisationService = {};

        organisationService.getPoints = function(orgId, date) {
            var deferred = $q.defer();
            $http.get('/api/organisation/points/' + orgId+ "/" + localStorage.authToken)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

         organisationService.updatePoint = function(pointId, data) {
             var deferred = $q.defer();
             $http.post('/api/updatepoint/' + pointId+ "/" + localStorage.authToken, data)
                 .then(function (response) {
                     deferred.resolve(response);
                 })
                 .catch(function (error) {
                     deferred.reject(error);
                 });
             return deferred.promise;
        };

        organisationService.getOrganization = function(orgId, date) {
            var deferred = $q.defer();
            $http.get('/api/organization/' + orgId +  "/" + localStorage.authToken)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        organisationService.getOrganizations = function(userId) {
            var deferred = $q.defer();
            $http.get('/api/organizations/' + userId +  "/" + localStorage.authToken)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        return organisationService;
    }]);