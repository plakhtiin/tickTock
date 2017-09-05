/**
 * Created by nastya on 05.09.17.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {config} from './constants';

@Injectable()

export class trackingSystemService {
    trackingSystemService(id) {
        var url = config.serverUrl + '/api/schedule/start/' + id + '/' + localStorage.authToken;
        // this.http.post(url)
        //     .then(function (response) {
        //         localStorage.userData = JSON.stringify(response.data.userData);
        //         localStorage.authToken = response.data.result.token;
        //         localStorage.tokenTime = response.data.result.time;
        //         localStorage.userId = response.data.result.id;
        //     })
        //     .catch(function (error) {
        //
        //     });
    };

    stopTime(id) {
        var url = config.serverUrl + '/api/schedule/start/' + id + '/' + localStorage.authToken;
        // $http.post(url)
        //    .then(function (response) {
        //        $rootScope.userData = response.data.userData;
        //        $rootScope.authToken = response.data.result.token;
        //        $rootScope.tokenTime = response.data.result.time;
        //        $rootScope.userId = response.data.result.id;
        //    })
        //    .catch(function (error) {
        //    });
    };

    updateOrganisation(data) {
        // return this.http.post('/api/updateOrganisation/' + localStorage.authToken, data);
    };

    getWeekdaysUsers(idOrganisation, date) {
        // return this.http.get("/api/getWeekdaysUsers/" + localStorage.authToken + "/" + idOrganisation + "/" + date.toString());
    };
}
