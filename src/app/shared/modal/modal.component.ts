import { Component, EventEmitter, Output } from "@angular/core";

/**
 * A pop up element which displays contents infront of and deactivates all other page content.
 */

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {   

    @Output()
    close = new EventEmitter<void>();
  
    onClose() {
        this.close.emit();
    }
    
}