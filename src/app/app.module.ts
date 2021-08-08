import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

const baseRoutes: Routes = [
    { path: 'login', component: HomeComponent },
    { path: 'register', component: HomeComponent },
    { path: '', component: HomeComponent },
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
        RouterModule.forRoot(baseRoutes),
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
