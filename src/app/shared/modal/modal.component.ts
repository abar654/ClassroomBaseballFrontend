import { Component, EventEmitter, Input, Output } from "@angular/core";

/**
 * A pop up element which displays contents infront of and deactivates all other page content.
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