import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
export class PopupComponent implements OnInit{   

    popupOptions: PopupOptions = null;

    constructor(
        private popupService: PopupService
    ){}

    ngOnInit(): void {
        this.popupService.getDisplayOptions().subscribe(options => {
            this.popupOptions = options;
        });
    }

    onClick(action: () => void) {
        action();
        this.popupService.close();
    }
    
}