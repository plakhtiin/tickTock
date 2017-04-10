/**
 * Created by user on 23.02.17.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
    // {
    //     path:'',
    //     redirectTo: '/users',
    //     pathMatch: 'full'
    // },{
    // path: 'users',
    //     component: UsersComponent,
    //     children:[
    //         {
    //             path: '',
    //             component: UsersListComponent,
    //         },
    //         {
    //             path: 'create',
    //             component: UserCreateComponent,
    //         },
    //         {
    //             path: ':id',
    //             component: UserSingleComponent,
    //         },
    //         {
    //             path: ':id/edit',
    //             component: UserEditComponent,
    //         }
    //     ]
    // }
];

export const routing = RouterModule.forRoot(routes);