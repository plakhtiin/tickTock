/**
 * Created by nastya on 05.09.17.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {config} from './constants';

@Injectable()

export class loginService {

    login(username, password, cb) {
        let params = {
            username: username,
            password: password
        };

        return this.http.post(config.serverUrl + '/api/login', params)
            .map((response: Response) => {
                response.json();
                localStorage.userData = JSON.stringify(response.data.userData);
                localStorage.authToken = response.data.result.token;
                localStorage.tokenTime = response.data.result.time;
                localStorage.userId = response.data.result.id;
            })
    }

    getUserData() {
        var time = localStorage.tokenTime;
        if (time > moment().format('hh:mm:ss DD/MM/YYYY')) {
            delete localStorage.userData;
            delete localStorage.authToken;
            delete localStorage.tokenTime;
            delete localStorage.userId;
            $location.path("/login");
        } else {
            var data = JSON.parse(localStorage.userData);
            if (!data) {
                var id = localStorage.userId;
                return this.http.get(config.serverUrl + '/api/user/data/' + id + '/' + localStorage.authToken)
                    .then(function (response) {
                    })
                    .catch(function (error) {
                    });
            } else {
                return data;
            }
        }
    };

    getToken() {
        var time = localStorage.tokenTime;
        if (time > moment().format('hh:mm:ss DD/MM/YYYY')) {
            delete localStorage.userData;
            delete localStorage.authToken;
            delete localStorage.tokenTime;
            delete localStorage.userId;
            $location.path("/login");
            return false;
        } else {
            return localStorage.authToken;
        }
    }

    logOut() {
        delete localStorage.userData;
        delete localStorage.authToken;
        delete localStorage.tokenTime;
        delete localStorage.userId;
        $location.path("/login");
        console.log("/login");
    }

    isAuthenticated() {
        var time = localStorage.tokenTime;
        if (localStorage['authToken'] && time < moment().format('hh:mm:ss DD/MM/YYYY')) {
            if ($location.path() == "/login") {
                $location.path("/start");
            }
        } else {
            $location.path("/login");
        }
    }

}