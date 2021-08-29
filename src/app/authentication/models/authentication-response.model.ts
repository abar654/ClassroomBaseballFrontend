/**
 * Data model for the successful authentication response received from backend
 */
export interface AuthenticationResponse {
    jwt: string,
    email: string,
    expirationDate: number
}