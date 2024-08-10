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
        this.login({email, password})
        return userAcoount;
      } else return null;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser (){
    try {
       return await this.account.get()
    } catch (error) {
       return null
    }

    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
  }
}

const auth = new authService();

export default auth;