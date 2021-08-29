import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ModalComponent } from "./modal/modal.component";

/**
 * A module for generic components and modules needed in various modules throughout the app.
 */

@NgModule({
    declarations: [
        ModalComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ModalComponent,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule {}