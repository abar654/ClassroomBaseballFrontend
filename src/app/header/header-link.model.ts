/**
 * A data object to hold the configuration options for a link to be displayed in the header.
 */

export interface HeaderLink {
    labelHtml: string,
    priority: number,
    alwaysVisible?: boolean,
    onClick: () => void
}