/**
 * Created by nastya on 05.09.17.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {config} from './constants';

@Injectable()

export class mainService {
    // getUser = function (userId) {
    //     this.http.get(config.serverUrl + '/api/user/data/' + userId + '/' + localStorage.authToken)
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // }
    // updateUser(data) {
    //     this.http.post(config.serverUrl + '/api/updateuser/data/' + localStorage.authToken, data)
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // }
    // createUser(data) {
    //     this.http.post(config.serverUrl + '/api/createuser/data/' + localStorage.authToken, data)
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // }
    //
    // getUsers() {
    //     this.http.get(config.serverUrl + '/api/users/data/' + localStorage.authToken)
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // }
    //
    // removeUser(user) {
    //     this.http.post(config.serverUrl + '/api/removeuser/data/' + localStorage.authToken, user)
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // };
}