import {
    Context,
    createConnector,
    ConnectorError,
    readConfig,
    Response,
    logger,
    StdAccountListOutput,
    StdAccountReadInput,
    StdAccountReadOutput,
    StdAccountCreateInput,    
    StdAccountCreateOutput,    
    StdAccountDeleteInput,
    StdAccountDeleteOutput,
    StdAccountDisableInput,
    StdAccountDisableOutput,
    StdAccountEnableInput,
    StdAccountEnableOutput,
    StdAccountUnlockInput,
    StdAccountUnlockOutput,
    StdAccountUpdateInput,
    StdAccountUpdateOutput,
    StdTestConnectionOutput,
    StdEntitlementListInput,
    StdEntitlementListOutput,
    StdEntitlementReadOutput,
    StdEntitlementReadInput
} from '@sailpoint/connector-sdk'
import { MyClient } from './my-client'
import { Util } from './tools/util'

// Connector must be exported as module property named connector
export const connector = async () => {

    // Get connector source config
    const config = await readConfig()

    const util = new Util();

    // Use the configuration API for Remote Support and Privileged Remote Access, to initialize a client
    const myClient = new MyClient(config)

    //  We use a try catch block here, to trap any error that would happen at the index level.
    //    Error handling should prevent errors at the index level.
    try{
    return createConnector()
        .stdTestConnection(async (context: Context, input: undefined, res: Response<StdTestConnectionOutput>) => {
            logger.info("Running test connection")
            res.send(await myClient.testConnection())
        })
        .stdAccountList(async (context: Context, input: any, res: Response<StdAccountListOutput>) => {

            const accounts = await myClient.getAllAccounts()
            
            for (const account of accounts) {
                // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
                if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
                if(account.private_display_name){res.send(util.userToAccount_rs(account))}
            }
                logger.info(`stdAccountList sent ${accounts.length} accounts`)
        })
        .stdAccountRead(async (context: Context, input: StdAccountReadInput, res: Response<StdAccountReadOutput>) => {
            const account = await myClient.getAccount(input.identity)

                // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
                if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
                if(account.private_display_name){res.send(util.userToAccount_rs(account))}

            logger.info(`stdAccountRead read account : ${input.identity}`)

        })
        .stdAccountCreate(async (context: Context, input: StdAccountCreateInput, res: Response<StdAccountCreateOutput>) => {
            logger.info(input, "creating account using input")
            if (!input) {
                throw new Error('identity cannot be null')
            }
            const account = await myClient.createAccount(input.attributes)
            logger.info(account, "created user in SRA")
            // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
            if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
            if(account.private_display_name){res.send(util.userToAccount_rs(account))}

        })

        .stdAccountUpdate(async (context: Context, input: StdAccountUpdateInput, res: Response<StdAccountUpdateOutput>) => {
            logger.info(input, "getting account using input")
            logger.info(input.identity, "changing the following account in BeyondTrust SRA")

            input.changes.forEach((c: { op: string }) => {
                switch (c.op) {
                    case "Add":
                        myClient.changeAccount(input.identity, c)
                        break
                    case "Remove":
                        myClient.changeAccount(input.identity, c)
                        break
                    default:
                        throw new ConnectorError('Unknown account change op: ' + c.op)
                }
            })
            
//            const account = await myClient.changeAccount(input.identity, input.changes)                
            const account = await myClient.getAccount(input.identity)                
               
            // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
            if(!(account.private_display_name)){logger.info('### We DO NOT have Display Name');res.send(util.userToAccount_pra(account))}
            if(account.private_display_name){logger.info('### We have Display Name');res.send(util.userToAccount_rs(account))}

        })

        .stdAccountDisable(async (context: Context, input: StdAccountDisableInput, res: Response<StdAccountDisableOutput>) => {
            logger.info(input.identity, "disabling the following account in BeyondTrust SRA")
            const account = await myClient.changeAccountStatus(input.identity, "disable")
            logger.info(input.identity, "account after changes applied")
            // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
            if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
            if(account.private_display_name){res.send(util.userToAccount_rs(account))}

        })

        .stdAccountEnable(async (context: Context, input: StdAccountEnableInput, res: Response<StdAccountEnableOutput>) => {
            logger.info(input.identity, "enabling the following account in BeyondTrust SRA")
            const account = await myClient.changeAccountStatus(input.identity, "enable")
            logger.info(input.identity, "account after changes applied")
            // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
            if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
            if(account.private_display_name){res.send(util.userToAccount_rs(account))}

        })

        .stdAccountUnlock(async (context: Context, input: StdAccountUnlockInput, res: Response<StdAccountUnlockOutput>) => {
            logger.info(input.identity, "unlocking the following account in BeyondTrust SRA")
            const account = await myClient.changeAccountStatus(input.identity, "unlock")
            logger.info(input.identity, "account after changes applied")
            // Here we need to know whether the instance is PRA or Remote Support(add private_display_name)
            if(!(account.private_display_name)){res.send(util.userToAccount_pra(account))}
            if(account.private_display_name){res.send(util.userToAccount_rs(account))}

        })

        .stdAccountDelete(async (context: Context, input: StdAccountDeleteInput, res: Response<StdAccountDeleteOutput>) => {
            logger.info(input.identity, "deleting the following account in BeyondTrust SRA")
            const account = await myClient.changeAccountStatus(input.identity, "delete")
            logger.info(input.identity, "account after changes applied")
//            res.send(account.toStdAccountDisableOutput())
        })

        .stdEntitlementList(async (context: Context, input: StdEntitlementListInput, res: Response<StdEntitlementListOutput>) => {
            const groups = await myClient.getAllEntitlements()
            logger.info(groups, "fetched the following Group Policies")
            for (const group of groups) {
            res.send(util.groupToEntitlement(group))
}
            logger.info(`stdEntitlementList sent ${groups.length} groups`)
        })

        .stdEntitlementRead(async (context: Context, input: StdEntitlementReadInput, res: Response<StdEntitlementReadOutput>) => {
                logger.debug(input, 'entitlement read input object')
                const group: any = await myClient.getEntitlement(input.identity)
                logger.debug(group, 'SRA  group found')
                res.send(util.groupToEntitlement(group))
        })
    } catch (err:any) {
        throw new ConnectorError(err.name+'  :index:  '+err.message)
    }

        }
