import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Http} from '@angular/http';
import {LoginService} from '../../services/loginService';
export class UserLogIn{
    email: string;
    password: string;
}

@Component({
    selector: 'log-in',
    templateUrl: './app/user-activity/login.component/login.component.html',
    styleUrls: ['./app/user-activity/login.component/login.component.css']
})

export class LogInComponent implements OnInit{
    userLogIn: UserLogIn = new UserLogIn();

    constructor(private loginService : LoginService){
        this.userLogIn.email = '';
        this.userLogIn.password = '';
    }

    ngOnInit(){
        this.loginService.getToken()
        //     .then(function (data) {
        //     if (data) {
        //         // $state.go('start');
        //         // $location.path('/start');
        //     }
        // });
    }

    onSubmit(){
        this.loginService.login(this.userLogIn.email ,this.userLogIn.password)
            // .then(function (data) {
            //     // $state.go('start');
            // }, function (err) {
            //
            // });
        console.log('log in!')
    }

}