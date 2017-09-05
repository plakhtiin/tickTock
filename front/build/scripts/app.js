(function () {
    'use strict';
    
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ui.bootstrap',
        'angular-md5',
        'ngCookies',
        'uiSwitch'
    ]).run(RunApp).config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    function RunApp($urlRouter, $state, $location) {
        $state.go('start');
        $location.path("/start");
    }

})();
/**
 * Created by nastya on 17.04.17.
 */
(function(){

    angular.module("app")
        .config([
                "$stateProvider",
                function ($stateProvider)
                {
                    $stateProvider
                        .state('start', {
                            url: '/start',
                            templateUrl: './scripts/app.component.html',
                            title: 'Start',
                            controller: 'mainCtrl',
                            controllerAs: 'vm'
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: './scripts/user-activity/login.component/login.component.html',
                            title: 'Statistic',
                            controller: 'loginCtrl',
                            controllerAs: 'vm'
                        })
                        .state('statistics', {
                            url: '/statistics',
                            templateUrl: './scripts/user-activity/statistic.component/statistic.component.html',
                            title: 'Statistic',
                            controller: 'statisticCtrl',
                            controllerAs: 'vm'
                        })
                        .state('settings', {
                            url: '/settings',
                            templateUrl: './scripts/user-activity/settings.component/settings.component.html',
                            title: 'Settings',
                            controller: 'settingsCtrl',
                            controllerAs: 'vm'
                        })
                        .state('new-user', {
                            url: '/new-user',
                            templateUrl: './scripts/user-activity/new-user.component/new-user.component.html',
                            title: 'New User',
                            controller: 'newUserCtrl',
                            controllerAs: 'vm'
                        });
                }
            ]
        );
})();


/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app')

    .constant('config', {
      loginUrl: 'localhost:8888',
      serverUrl: 'http://localhost:8888'
    })

})();

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
                    $rootScope.userData = response.data.userData;
                    $rootScope.authToken = response.data.result.token;
                    $rootScope.tokenTime = response.data.result.time;
                    $rootScope.userId = response.data.result.id;
					deferred.resolve(response.id);
				})
				.catch(function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		loginService.getUserData = function () {
            var deferred = $q.defer();
            var time = $rootScope.tokenTime;
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
	            delete $rootScope.userData;
	            delete $rootScope.authToken;
	            delete $rootScope.tokenTime;
	            delete $rootScope.userId;
                $location.path("/login");
                deferred.reject();
            }else {
                var data  = JSON.parse($cookies.get("userData"));
                if(!data){
                    var id = $rootScope.userId;
                    $http.get(config.serverUrl + '/api/user/data/' + id +'/'+ loginService.getToken())
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
            var time = $rootScope.tokenTime;
            if(time > moment().format('hh:mm:ss DD/MM/YYYY')){
	            delete $rootScope.userData;
	            delete $rootScope.authToken;
	            delete $rootScope.tokenTime;
	            delete $rootScope.userId;
                $location.path("/login");
                deferred.reject();
            }else {
                deferred.resolve($rootScope.authToken);
            }
            return deferred.promise;
        };
		loginService.logOut = function () {
			delete $rootScope.userData;
			delete $rootScope.authToken;
			delete $rootScope.tokenTime;
			delete $rootScope.userId;
            $location.path("/login");
            console.log("/login");
		};

		loginService.isAuthenticated = function () {
            var time = $rootScope.tokenTime;;
			if ($cookies.get('authToken') && time < moment().format('hh:mm:ss DD/MM/YYYY')){
				if ($location.path() == "/login") {
					$location.path("/start");
				}
			} else {
				$location.path("/login");
			}
		};


		return loginService;
	}]);

'use strict';

angular.module('app')
    .service('mainService', ['config', '$http', "loginService", "$q", "$cookies", function (config, $http, loginService, $q, $cookies) {

        var mainService = {};

        mainService.getUser = function (userId) {
            var deferred = $q.defer();
            $http.get(config.serverUrl + '/api/user/data/' + userId + '/' + loginService.getToken())
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
            $http.post(config.serverUrl + '/api/updateuser/data/' + userId + '/' + loginService.getToken(), data)
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

'use strict';

angular.module('app')
    .service('messageService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var messageService = {};

        messageService.sendMessage = function(pointId, msg) {
	        var deferred = $q.defer();
	        $http.post('/api/sendmessage/' + pointId + "/" + loginService.getToken(), msg)
		        .then(function (response) {
			        deferred.resolve(response);
		        })
		        .catch(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
        return messageService;
    }]);
'use strict';

angular.module('app')
    .service('organisationService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var organisationService = {};

        organisationService.getPoints = function(orgId, date) {
            var deferred = $q.defer();
            $http.get('/api/organisation/points/' + orgId+ "/" + loginService.getToken())
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
             $http.post('/api/updatepoint/' + pointId+ "/" + loginService.getToken(), data)
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
            $http.get('/api/organization/' + orgId +  "/" + loginService.getToken())
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
            $http.get('/api/organizations/' + userId +  "/" + loginService.getToken())
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
'use strict';
angular.module('app')
    .service('scheduleService', ['$http', 'loginService', '$q', function($http, loginService, $q) {

        var scheduleService = {};

        scheduleService.getScheduleByDay = function(data) {
            var deferred = $q.defer();
            $http.post('/api/schedule/delta/' + loginService.getToken(), data)
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
             $http.get('/api/point/' + pointId+ "/" + loginService.getToken())
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

'use strict';

angular.module('app')
    .service('trackingSystemService', ['$http', 'loginService', 'config', '$q', '$rootScope', function($http, loginService, config, $q, $rootScope) {

        var trackingSystemService = {};

        trackingSystemService.startTime = function(id) {
	        var deferred = $q.defer();
            var url = config.serverUrl + '/api/schedule/start/'+ id +'/' + $rootScope.authToken;
	        $http.post(url)
		        .then(function (response) {
			        $rootScope.userData = response.data.userData;
			        $rootScope.authToken = response.data.result.token;
			        $rootScope.tokenTime = response.data.result.time;
			        $rootScope.userId = response.data.result.id;
			        deferred.resolve(response.id);
		        })
		        .catch(function (error) {
			        deferred.reject(error);
		        });
	        return deferred.promise;
        };
        trackingSystemService.stopTime = function(id) {
	        var deferred = $q.defer();
            var url = config.serverUrl + '/api/schedule/start/'+ id +'/' + $rootScope.authToken;
	        // $http.post(url)
		     //    .then(function (response) {
			 //        $rootScope.userData = response.data.userData;
			 //        $rootScope.authToken = response.data.result.token;
			 //        $rootScope.tokenTime = response.data.result.time;
			 //        $rootScope.userId = response.data.result.id;
			        deferred.resolve();
		     //    })
		     //    .catch(function (error) {
			 //        deferred.reject(error);
		     //    });
	        return deferred.promise;
        };

        trackingSystemService.updateOrganisation = function(data) {
            return $http({
                url: '/api/updateOrganisation/' + loginService.getToken(),
                method: 'POST',
                data: data
            });
        };

        trackingSystemService.getWeekdaysUsers = function(idOrganisation, date) {
            return $http({
                url: "/api/getWeekdaysUsers/" + loginService.getToken() + "/" + idOrganisation + "/" + date.toString(),
                method: "get"
            });
        };


        return trackingSystemService;
    }]);

/**
 * Created by nastya on 17.04.17.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'loginService', '$state', '$rootScope', 'trackingSystemService'];
	function mainCtrl($scope, loginService, $state, $rootScope, trackingSystemService) {

		var vm = this;
		vm.userData = angular.copy($rootScope.userData);
		vm.toggleTimer = false;
		vm.logOut = logOut;

		loginService.getToken().then(function (data) {
			if (!data) {
				$state.go('login');
			} else {
				if (!$rootScope.userData) {
					loginService.getUserData().then(function (user) {
						$rootScope.userData = angular.copy(user.data);
						vm.userData = angular.copy(user.data);
					});
				} else {
					vm.userData = angular.copy($rootScope.userData);
				}
			}
		});

		function logOut() {
			loginService.logOut();
		}

		$scope.$watch('vm.toggleTimer', function(newVal){
			var id = $rootScope.timeId;
			if(newVal === true)
				trackingSystemService.startTime($rootScope.userId).then(function(id){
					$rootScope.timeId = angular.copy(id);
				});
			else if(newVal === false)
				trackingSystemService.stopTime(id).then(function(){
					delete $rootScope.timeId;
				});
		});

	}
})();
/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('statisticCtrl', function ($scope) {

            var vm = this;
            vm.dateFormat = 'MMM dd, yyyy';
            vm.currentDay = new Date();
            vm.popup = {
                opened: false
            };
            vm.imagesStat = new Array(48);
            _.fill(vm.imagesStat, {name: "assets/OfficeTime_icon_64.png", time: moment().seconds()}, 0, 48);
        });
})();
/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('newUserCtrl', function ($scope) {

            var vm = this;

        })
})();
/**
 * Created by nastya on 17.04.17.
 */
angular
    .module('app')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', 'loginService', '$state'];
function loginCtrl($scope, loginService, $state) {
    var vm = this;

    vm.userLogIn = {
        username: '',
        password: ''
    };
    vm.submitLoginForm = function () {
        loginService.login(vm.userLogIn.username ,vm.userLogIn.password).then(function(data){
            $state.go('start');
        }, function (err) {

        });
    };
}
/**
 * Created by nastya on 17.04.17.
 */
(function () {
    'use strict';

    angular
        .module('app')

        .controller('settingsCtrl', function ($scope) {

            var vm = this;
            vm.intervalTime = 10;
            vm.users = [
                {name: 'User1 test'}
            ]
        })
})();