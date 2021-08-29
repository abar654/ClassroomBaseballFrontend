import { Component } from "@angular/core";

/**
 * A simple CSS only spinner from https://loading.io/css/
 */

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}