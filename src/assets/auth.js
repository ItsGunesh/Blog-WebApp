import { Client,Account,ID} from "appwrite";
import config from "../config/config";

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount(){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login(){
        try {
            await this.account.createEmailPasswordSession({email,password}) // change creatEmailSession
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService