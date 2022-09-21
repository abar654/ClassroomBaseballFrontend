import { Component, Input } from "@angular/core";

/**
 * A component for displaying a configured player avatar.
 */

@Component({
    selector: 'app-player-avatar',
    templateUrl: './player-avatar.component.html'
})
export class PlayerAvatarComponent {

    @Input()
    color: string;

    @Input()
    name: string;

    @Input()
    height: string;
    
}