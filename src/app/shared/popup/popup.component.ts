import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PopupOptions } from "./popup-options.model";
import { PopupService } from "./popup.service";

/**
 * A small pop up element which displays a message and some buttons
 * on top of the rest of the content.
 * 
 * Should be placed in the root component and can be accessed via the PopupService.
 */

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {   

    popupOptions: PopupOptions = null;
    popupOptionsSub: Subscription = null;

    constructor(
        private popupService: PopupService
    ){}

    ngOnInit(): void {
        this.popupOptionsSub = this.popupService.getDisplayOptions().subscribe(options => {
            this.popupOptions = options;
        });
    }

    ngOnDestroy(): void {
        this.popupOptionsSub && this.popupOptionsSub.unsubscribe();
    }

    onClick(action: () => void) {
        action();
        this.popupService.close();
    }
    
}