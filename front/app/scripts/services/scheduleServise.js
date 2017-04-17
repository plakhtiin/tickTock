'use strict';
angular.module('app')
    .service('scheduleService', ['$http', 'loginService', function($http, loginService) {

        var scheduleService = {};

        scheduleService.getScheduleByDay = function(data) {
            return $http({
                url: '/api/schedule/delta/' + loginService.getToken(),
                method: 'post',
                data:data
            });
        };

         scheduleService.getPoint = function(pointId, date) {
            return $http({
                url: '/api/point/' + pointId+ "/" + loginService.getToken(),
                method: 'GET',
            });
        }

        return scheduleService;
    }]);
