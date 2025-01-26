import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'

// 1. Declaring the class
export class AuthService {
    // Properties
    client = new Client()
    account 

    // when the constructor is called the client and account properties will be set
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // wrapper method - which will create an account using the passed params. The user will not care what service is being used.
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount){
                // If user is created successfully, then login 
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch(error) {
            throw error
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password)
        } catch(error) {
            throw error
        }
    }

    // When user tries to access a certain page check whether he is logged in or not
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite service error : ', error)
        }

        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite logout error : ', error)
        }
    }
}

// 2. Exporting the object of class so at time of importing we don't have to create an object of class and then use it.
const authService = new AuthService()

export default authService