import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal/modal.component";

/**
 * A module for generic components and modules needed in various modules throughout the app.
 */

@NgModule({
    declarations: [
        ModalComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ModalComponent,
        CommonModule
    ]
})
export class SharedModule {}