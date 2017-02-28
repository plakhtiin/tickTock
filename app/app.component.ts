import {Component, OnInit} from "@angular/core";
import {Http} from '@angular/http';
import { UiSwitchModule } from 'angular2-ui-switch';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit{
    message:string = 'hello';

    constructor(){}

    ngOnInit(){
        // grab users
        // this.http.get('https://reqres.in/api/users?page=2')
        //     .map(res => res.json().data)
        //     .subscribe(users => this.users = users);

        // this.http.get('https://reqres.in/api/users?page=2')
        //     .toPromise()
        //     .then(data =>{
        //         console.log(data)
        //     });
        // this.service.getUsers()
        //     .subscribe(
        //         users => this.users = users,
        //         err =>{
        //             //show error msg
        //         }
        //     );
    }
    // getUsers(){
    //     return this.http.get('http://blambloom.com/api/comments')
    // }

    // getUsers().subscribe(users => console.log(users));

}