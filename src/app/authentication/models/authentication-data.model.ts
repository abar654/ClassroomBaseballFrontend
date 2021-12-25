/**
 * Data model for storing and accessing authentication information
 */

export class AuthenticationData {

    constructor(
        public email: string,
        private _token: string,
        private _tokenExpirationDate: number
    ){}

    get token() {
        if (!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}