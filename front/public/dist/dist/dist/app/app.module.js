"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 10.02.17.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var app_component_1 = require("./app.component");
var login_component_1 = require("./user-activity/login.component/login.component");
var new_user_component_1 = require("./user-activity/new-user.component/new-user.component");
var settings_component_1 = require("./user-activity/settings.component/settings.component");
var statistic_component_1 = require("./user-activity/statistic.component/statistic.component");
var app_routing_1 = require("./app.routing");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            angular2_ui_switch_1.UiSwitchModule
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LogInComponent,
            new_user_component_1.NewUserComponent,
            settings_component_1.SettingsComponent,
            statistic_component_1.StatisticComponent
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map 
//# sourceMappingURL=app.module.js.map 
//# sourceMappingURL=app.module.js.map