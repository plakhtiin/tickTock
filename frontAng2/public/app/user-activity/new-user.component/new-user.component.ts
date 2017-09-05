import {Component, OnInit} from "@angular/core";
import {Http} from '@angular/http';


@Component({
    selector: 'new-user',
    templateUrl: './app/user-activity/new-user.component/new-user.component.html'
})

export class NewUserComponent implements OnInit{
    message:string = 'hello';

    constructor(){}

    ngOnInit(){

    }

}