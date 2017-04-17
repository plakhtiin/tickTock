'use strict';

angular.module('app')
    .service('organisationService', ['$http', 'loginService', function($http, loginService) {

        var organisationService = {};

        organisationService.getPoints = function(orgId, date) {
            return $http({
                url: '/api/organisation/points/' + orgId+ "/" + loginService.getToken(),
                method: 'GET',
            });
        }

         organisationService.updatePoint = function(pointId, data) {
            return $http({
                url: '/api/updatepoint/' + pointId+ "/" + loginService.getToken(),
                method: 'POST',
                data: data
            });
        }

        organisationService.getOrganization = function(orgId, date) {
            return $http({
                url: '/api/organization/' + orgId +  "/" + loginService.getToken(),
                method: 'GET',
            });
        }
        organisationService.getOrganizations = function(userId) {
            return $http({
                url: '/api/organizations/' + userId + "/" + loginService.getToken(),
                method: 'GET',
            });
        };

        return organisationService;
    }]);