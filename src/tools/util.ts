import { AttributeChange, ConnectorError, StdAccountCreateInput, StdAccountCreateOutput, StdEntitlementListOutput } from "@sailpoint/connector-sdk"
import { Group } from "../model/group"
import { User } from "../model/user"

export class Util {
  

    /**
     * converts user object to IDN account output for Privileged Remote Access
     *
     * @param {User} user User object
     * @returns {StdAccountCreateOutput} IDN account create object
     */
    public userToAccount_pra(user: User): StdAccountCreateOutput {
        return {
            // Convert id to string because IDN doesn't work well with number types for the account ID
            identity: user.id ? user.id : '',
            uuid: user.id ? user.id : '',
            attributes: {
                id: user.id ? user.id : '',
                username: user.username ? user.username : '',
                email_address: user.email_address ? user.email_address : '',
                security_provider_id: user.security_provider_id ? user.security_provider_id : null,
                security_provider_name: user.security_provider_name ? user.security_provider_name : null,
                public_display_name: user.public_display_name ? user.public_display_name : '',
                enabled: user.enabled ? user.enabled : false,
                failed_logins: user.failed_logins ? user.failed_logins : null,
                two_factor_required: user.two_factor_required ? user.two_factor_required : null,
                preferred_email_language: user.preferred_email_language ? user.preferred_email_language : '' ,
                groups: user.groups ? user.groups : ''
            }
        }
    }

    /**
     * converts user object to IDN account output for Remote Support
     *
     * @param {User} user User object
     * @returns {StdAccountCreateOutput} IDN account create object
     */
    public userToAccount_rs(user: User): StdAccountCreateOutput {
        return {
            // Convert id to string because IDN doesn't work well with number types for the account ID
            identity: user.id ? user.id : '',
            uuid: user.id ? user.id : '',
            attributes: {
                id: user.id ? user.id : '',
                username: user.username ? user.username : '',
                email_address: user.email_address ? user.email_address : '',
                security_provider_id: user.security_provider_id ? user.security_provider_id : null,
                security_provider_name: user.security_provider_name ? user.security_provider_name : null,
                public_display_name: user.public_display_name ? user.public_display_name : '',
                private_display_name: user.private_display_name ? user.private_display_name : '',
                enabled: user.enabled ? user.enabled : false,
                failed_logins: user.failed_logins ? user.failed_logins : null,
                two_factor_required: user.two_factor_required ? user.two_factor_required : null,
                preferred_email_language: user.preferred_email_language ? user.preferred_email_language : '' ,
                groups: user.groups ? user.groups : ''
            }
        }
    }


    /**
     * converts Group Policy object to IDN Entitlement List Output
     *
     * @param {Group} group group object
     * @returns {StdAccountCreateOutput} IDN Entitlement List Output
     */
    public groupToEntitlement(group: Group): StdEntitlementListOutput {
        const groupId = group.id.toString()
        return {
            identity: groupId + ':' + group.name,
            uuid: groupId + ':' + group.name,
            type: 'group',
            attributes: {
                id: groupId + ':' + group.name,
                name: group.name,
                perm_share_other_team: group.perm_share_other_team,
                perm_extended_availability_mode_allowed: group.perm_extended_availability_mode_allowed,
                perm_jump_client: group.perm_jump_client,
                perm_local_jump: group.perm_local_jump,
                perm_remote_jump: group.perm_remote_jump,
                perm_remote_vnc: group.perm_remote_vnc,
                perm_remote_rdp: group.perm_remote_rdp,
                perm_shell_jump: group.perm_shell_jump,
                perm_session_idle_timeout: group.perm_session_idle_timeout,
                perm_edit_external_key: group.perm_edit_external_key,
                perm_collaborate: group.perm_collaborate,
                perm_collaborate_control: group.perm_collaborate_control,
                perm_invite_external_user: group.perm_invite_external_user,
                perm_protocol_tunnel: group.perm_protocol_tunnel,
                perm_access_allowed: group.perm_access_allowed,
                perm_web_jump: group.perm_web_jump,
                access_perm_status: group.access_perm_status
            }
        }
    }

}
