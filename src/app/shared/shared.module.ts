import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ModalComponent } from "./modal/modal.component";
import { PopupComponent } from "./popup/popup.component";

/**
 * A module for generic components and modules needed in various modules throughout the app.
 */

@NgModule({
    declarations: [
        ModalComponent,
        LoadingSpinnerComponent,
        PopupComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ModalComponent,
        LoadingSpinnerComponent,
        PopupComponent,
        CommonModule
    ]
})
export class SharedModule {}