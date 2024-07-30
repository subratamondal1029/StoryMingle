import { Client, Account, ID } from "appwrite";
import conf from "../config/config";

class authService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);

    this.account = new Account(this.client);
  }

  async register({ email, password, name }) {
    try {
      const userAcoount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAcoount) {
        // call login mathod
        this.login({email, password})
      } else return userAcoount;
    } catch (error) {
        console.log("auth service :: register :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.log("auth service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser (){
    try {
       return await this.account.get()
    } catch (error) {
        console.log("auth service :: getCurrentUser :: error", error);
        throw error;
    }

    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log("auth service :: logout :: error", error);
        throw error
    }
  }
}

const auth = new authService();

export default auth;