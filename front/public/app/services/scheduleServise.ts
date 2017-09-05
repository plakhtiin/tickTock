/**
 * Created by nastya on 05.09.17.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {config} from './constants';

@Injectable()

export class scheduleService {
    getScheduleByDay(data) {
        // this.http.post('/api/schedule/delta/' + localStorage.authToken, data)
        //     .then(function (response) {
        //     })
        //     .catch(function (error) {
        //     });
    };

    getPoint(pointId, date) {
        // this.http.get('/api/point/' + pointId + "/" + localStorage.authToken)
        //     .then(function (response) {
        //     })
        //     .catch(function (error) {
        //     });
    }
}