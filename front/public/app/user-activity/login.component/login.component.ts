import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Http} from '@angular/http';
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

    constructor(){
        this.userLogIn.email = '';
        this.userLogIn.password = '';
    }

    ngOnInit(){
    }

    onSubmit(){
        console.log('log in!')
    }

}