import { Component, Input } from "@angular/core";

/**
 * A component for displaying a configured team award.
 */

 @Component({
    selector: 'app-team-award',
    templateUrl: './team-award.component.html',
    styleUrls: ['./team-award.component.css']
})
export class TeamAwardComponent {

    @Input()
    title: string = "";

    @Input()
    recipient: string = "";

}