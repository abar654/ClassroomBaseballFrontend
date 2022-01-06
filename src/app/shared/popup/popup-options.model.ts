/**
 * A data object to hold the configuration options for the popup component.
 */

export interface PopupOptions {
    message: string,
    dismissable: boolean,
    buttons: {
        label: string,
        onClick: () => void
    }[] 
}