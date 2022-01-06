import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PopupOptions } from "./popup-options.model";

/**
 * Provides an interface for controlling the contents of the popup component.
 */

 @Injectable({providedIn: 'root'})
 export class PopupService {

    private popupOptions: BehaviorSubject<PopupOptions> = new BehaviorSubject<PopupOptions>(null);

    public getDisplayOptions(): BehaviorSubject<PopupOptions> {
        return this.popupOptions;
    }

    public close(): void {
        this.popupOptions.next(null);
    }

    public show(options: PopupOptions): void {
        this.popupOptions.next(options);
    }
     
 }