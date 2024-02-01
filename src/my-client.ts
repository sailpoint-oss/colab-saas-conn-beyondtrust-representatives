import { ConnectorError, logger } from "@sailpoint/connector-sdk"
import {sra_auth, sra_GET_account, sra_GET_group_policies,sra_create_account,sra_change_account,sra_change_account_status,sra_create_account_ent,sra_GET_account_groups_table,sra_GET_account_groups_with_table,sra_GET_security_providers,sra_GET_group_policy,sra_GET_account_details,sra_GET_accounts_details,check_token_expiration,smart_error_handling} from './sra-functions'


export class MyClient {
    private readonly instance?: string
    private readonly authUrl?: string
    private readonly client_id?: string
    private readonly client_secret?: string

    constructor(config: any) {
        // Fetch necessary properties from config.
        // Global Variables
        // Remove trailing slash in URL if present.  Then store in Global Variables.
        if(config?.instance.substr(config?.instance.length - 1 ) == '/'){
            globalThis.__INSTANCE = config?.instance.substr(0,config?.instance.length - 1)
        }  else{
            globalThis.__INSTANCE = config?.instance
        }
        // Remove trailing slash in Auth URL if present.  Then store in Global Variables.
        if(config?.authUrl.substr(config?.authUrl.length - 1 ) == '/'){
            globalThis.__AUTHURL = config?.authUrl.substr(0,config?.authUrl.length - 1)
        }  else{
            globalThis.__AUTHURL = config?.authUrl
        }
        // Store Client Credentials in Global Variables
        globalThis.__CLIENT_ID = config?.client_id
        globalThis.__CLIENT_SECRET = config?.client_secret
    }

    async getAllAccounts(): Promise<any[]> {

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET accounts with details
            try{
                let resAccounts = await sra_GET_accounts_details()
                return resAccounts
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let resAccounts2 = await sra_GET_accounts_details()
                    return resAccounts2
                }    else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }

            }  
            }

    async getAccount(identity: string): Promise<any> {
        // GET account with details
        // which is why it's good practice for this to be async and return a promise.

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET account
            try{
                let resAccount = await sra_GET_account(identity)
                let resAccountDetails = await sra_GET_account_details(resAccount.data)
                return resAccountDetails
        }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let resAccount2 = await sra_GET_account(identity)
                    let resAccountDetails = await sra_GET_account_details(resAccount2.data)
                    return resAccountDetails
                }   else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }
            }  

    }

    async createAccount(account: string): Promise<any> {
        // In a real use case, this requires a HTTP call out to SaaS app to fetch an account,
        // which is why it's good practice for this to be async and return a promise.

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Declare account
            try{
                let resAccount = await sra_create_account_ent(account)
                return resAccount
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let resAccounts2 = await sra_create_account_ent(account)
                    return resAccounts2
                }   else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }

            } 
    }

    async changeAccount(account: string, change: any): Promise<any> {
        // In a real use case, this requires a HTTP call out to SaaS app to fetch an account,
        // which is why it's good practice for this to be async and return a promise.

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Change account
            try{
                let changeAccount = await sra_change_account(account,change)
                let getAccount = await sra_GET_account(account)
                return getAccount.data
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let changeAccount2 = await sra_change_account(account,change)
                    let getAccount2 = await sra_GET_account(account)
                    return getAccount2.data
                }     else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }

            }  
    }

    async changeAccountStatus(account: string, change: any): Promise<any> {
        // In a real use case, this requires a HTTP call out to SaaS app to fetch an account,
        // which is why it's good practice for this to be async and return a promise.

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Change account
            try{
                let changeAccount = await sra_change_account_status(account,change)
                let getAccount = await sra_GET_account(account)
                let resAccount = await sra_GET_account_details(getAccount.data)
                return resAccount
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let changeAccount2 = await sra_change_account_status(account,change)
                    let getAccount2 = await sra_GET_account(account)
                    let resAccount2 = await sra_GET_account_details(getAccount2.data)
                    return resAccount2
                }    else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }

                } 
    }

    async testConnection(): Promise<any> {

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

        // TEST = GET Security Providers.  This is an arbitrary choice.
        try{
        let SPs = await sra_GET_security_providers()
        logger.info(`Service Providers : ${JSON.stringify(SPs.data)}`)
        return {}
    } catch (err:any) {
        console.log('##### Error name = '+err.name)
        console.log('##### Error message = '+err.message)
        if(err.message == 'Request failed with status code 401'){
            console.log('#### error status = 401')
            let resAuth2: any = await sra_auth()
            let SPs2 = await sra_GET_security_providers()
            return {}
        }   else{
            console.log('We are about to throw ConnectorError in Test Connection')
            await smart_error_handling(err)
            return err.message
        }
    }
    }

    async getAllEntitlements(): Promise<any[]> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET entitlements
            try{
                let resGP = await sra_GET_group_policies()
                return resGP
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let resGP2 = await sra_GET_group_policies()
                    return resGP2
                    }    else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }
            }
    }

    async getEntitlement(identity: string): Promise<any[]> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await sra_auth()
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET entitlement
            try{
                let resGP = await sra_GET_group_policy(identity)
                return resGP
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await sra_auth()
                    let resGP2 = await sra_GET_group_policy(identity)
                    return resGP2
                    }     else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }

            }  

    }

}

