/**
 * Group Policy is Remote Support and Privileged Remote Access representation of a group, omitting the properties we don't need.
 */
 export class Group {
    id = ''
    name = ''
    perm_share_other_team = false
    perm_extended_availability_mode_allowed = false
    perm_jump_client = false
    perm_local_jump = false
    perm_remote_jump = false
    perm_remote_vnc = false
    perm_remote_rdp = false
    perm_shell_jump = false
    perm_session_idle_timeout = -1
    perm_edit_external_key = false
    perm_collaborate = false
    perm_collaborate_control = false
    perm_invite_external_user = false
    perm_protocol_tunnel = false
    perm_access_allowed = false
    perm_web_jump = false
    access_perm_status = ''
 }
