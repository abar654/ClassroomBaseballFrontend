import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderLink } from './header-link.model';
import { HeaderService } from './header.service';

/**
 * The header which appears along the top of the screen on all pages of the app.
 */

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    title: string = "Classroom Baseball";
    links: HeaderLink[] = [];
    isCollapsed: boolean = true;
    subscriptions: Subscription[] = [];

    constructor(
        private headerService: HeaderService
    ) { }

    ngOnInit(): void {
        this.subscriptions = [
            this.headerService.getTitleState().subscribe((title: string) => {
                this.title = title;
            }),
            this.headerService.getLinksState().subscribe((links: HeaderLink[]) => {
                this.links = links;
            })
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    onLinkClick(link: HeaderLink) {
        link.onClick();
        this.isCollapsed = true;
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
