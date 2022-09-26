import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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

    readonly SMALL_SCREEN_LIMIT_PX: number = 600;

    subscriptions: Subscription[] = [];

    title: string = "Classroom Baseball";

    navLinks: HeaderLink[] = [];
    menuLinks: HeaderLink[] = [];

    hasFooter: boolean = false;
    isMenuCollapsed: boolean = true;

    @HostListener('window:resize')
    onResize() {
        this.refreshLinks(this.headerService.getLinksState().getValue());
    }

    constructor(
        private headerService: HeaderService
    ) { }

    ngOnInit(): void {
        this.subscriptions = [
            this.headerService.getTitleState().subscribe((title: string) => {
                this.title = title;
            }),
            this.headerService.getLinksState().subscribe((links: HeaderLink[]) => {
                this.refreshLinks(links);
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
        this.isMenuCollapsed = true;
    }

    toggleCollapse(): void {
        this.isMenuCollapsed = !this.isMenuCollapsed;
    }

    refreshLinks(links: HeaderLink[]): void {
        if (window.innerWidth > this.SMALL_SCREEN_LIMIT_PX) {
            this.navLinks = links;
            this.menuLinks = [];
            this.hasFooter = false;
        } else {
            this.navLinks = links.filter(link => link.alwaysVisible);
            this.menuLinks = links.filter(link => !link.alwaysVisible);
            this.hasFooter = this.navLinks.length > 0 ? true : false;
        }
    }

}
