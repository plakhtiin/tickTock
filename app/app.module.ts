/**
 * Created by user on 10.02.17.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'angular2-ui-switch';
import { AppComponent } from './app.component';

import { routing } from './app.routing';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        UiSwitchModule
    ],
    declarations: [
        AppComponent

    ],
    providers: [

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}