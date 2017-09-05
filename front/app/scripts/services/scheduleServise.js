'use strict';
angular.module('app')
    .service('scheduleService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var scheduleService = {};

        scheduleService.getScheduleByDay = function(data) {
            var deferred = $q.defer();
            $http.post('/api/schedule/delta/' + localStorage.authToken, data)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

         scheduleService.getPoint = function(pointId, date) {
             var deferred = $q.defer();
             $http.get('/api/point/' + pointId+ "/" + localStorage.authToken)
                 .then(function (response) {
                     deferred.resolve(response);
                 })
                 .catch(function (error) {
                     deferred.reject(error);
                 });
             return deferred.promise;
        };

        return scheduleService;
    }]);
