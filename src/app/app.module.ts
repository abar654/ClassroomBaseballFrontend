import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { HomeRedirectGuard } from './authentication/guards/home-redirect.guard';
import { AuthHeaderInterceptor } from './authentication/interceptors/auth-header.interceptor';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

const baseRoutes: Routes = [
    { path: '', canActivate: [HomeRedirectGuard], component: HomeComponent },
    { path: 'login', canActivate: [HomeRedirectGuard], component: HomeComponent },
    { path: 'signup', canActivate: [HomeRedirectGuard], component: HomeComponent },
    { path: 'teams', canActivate: [AuthenticationGuard], loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
    { path: '**', redirectTo: '' },
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(baseRoutes),
        SharedModule,
        AuthenticationModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
