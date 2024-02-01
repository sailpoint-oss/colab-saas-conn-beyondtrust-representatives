import { Group } from "./group"

/**
 * User is a complete definition of a user, including entitlements
 */
export class User {
    id?: string
    username?: string
    email_address?: string
    enabled?: boolean
    security_provider_id?: number
    security_provider_name?: string
    public_display_name?: string
    private_display_name?: string
    failed_logins?: number
    two_factor_required?: boolean
    preferred_email_language?: string
    groups?: string

}