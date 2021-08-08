import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isCollapsed: boolean = false;
    isAuthenticated: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    onLogin(): void {
        this.router.navigate(['/login']);
    }

    onRegister(): void {
        this.router.navigate(['/register']);
    }

    onLogout(): void {
        // Dummy code
    }

}
