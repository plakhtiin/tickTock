"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserLogIn = (function () {
    function UserLogIn() {
    }
    return UserLogIn;
}());
exports.UserLogIn = UserLogIn;
var LogInComponent = (function () {
    function LogInComponent() {
        this.userLogIn = new UserLogIn();
        this.userLogIn.email = '';
        this.userLogIn.password = '';
    }
    LogInComponent.prototype.ngOnInit = function () {
    };
    LogInComponent.prototype.onSubmit = function () {
        console.log('log in!');
    };
    return LogInComponent;
}());
LogInComponent = __decorate([
    core_1.Component({
        selector: 'log-in',
        templateUrl: './app/user-activity/login.component/login.component.html',
        styleUrls: ['./app/user-activity/login.component/login.component.css']
    }),
    __metadata("design:paramtypes", [])
], LogInComponent);
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=login.component.js.map