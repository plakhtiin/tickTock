// 'use strict';

// angular.module('trackingSystemModule')
//     .service('trackingSystemService', ['$http', 'loginService', function($http, loginService) {

//         var trackingSystemService = {};

//         trackingSystemService.getOrganisations = function(data) {
//             return $http({
//                 url: '/api/getOrganisations/' + loginService.getToken(),
//                 method: 'POST',
//                 data: data
//             });
//         };

//         trackingSystemService.updateOrganisation = function(data) {
//             return $http({
//                 url: '/api/updateOrganisation/' + loginService.getToken(),
//                 method: 'POST',
//                 data: data
//             });
//         };

//         trackingSystemService.getWeekdaysUsers = function(idOrganisation, date) {
//             return $http({
//                 url: "/api/getWeekdaysUsers/" + loginService.getToken() + "/" + idOrganisation + "/" + date.toString(),
//                 method: "get"
//             });
//         };


//         return trackingSystemService;
//     }]);
