import { Component, EventEmitter, Input, Output } from "@angular/core";

/**
 * A pop up element which displays contents infront of and deactivates all other page content.
 * Content placed inside the <app-modal> element tags will be displayed in the modal,
 * unless element is a button with the "modal-button" class is applied in which case it will appear in the title bar.
 */

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {   

    @Input()
    title: string = null;

    @Output()
    close = new EventEmitter<void>();
  
    onClose() {
        this.close.emit();
    }
    
}