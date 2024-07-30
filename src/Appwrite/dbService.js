import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../config/config";

class DbService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Db service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
            title,
            content,
            featureImage,
            status
        }
      );
    } catch (error) {
      console.log("Dbservice :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
      );
      return true
    } catch (error) {
      console.log("Dbservice :: deletePost :: error", error);
      throw error;
      return false
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          slug,
        );
      } catch (error) {
        console.log("Dbservice :: getPost :: error", error);
        throw error;
        return false
      }
  }

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(conf.databaseId, conf.collectionId, queries)
    } catch (error) {
        console.log("Dbservice :: getPosts :: error", error);
    }
  }


    // file upload services

    async uploadFile({file}){
      try {
     return await this.storage.createFile(conf.backetId, ID.unique(), file)
      } catch (error) {
        console.log("Dbservice :: uploadFile :: error", error);
        throw error;
        return false
      }
    }

    async deleteFile(fileId){
      try {
         await this.storage.deleteFile(conf.backetId, fileId)
         return true
      } catch (error) {
        console.log("Dbservice :: deleteFile :: error", error);
        throw error
        return false
      }
    }

    filePreview(fileId){
      try {
        return this.storage.getFilePreview(conf.backetId, fileId)
      } catch (error) {
        throw error
        console.log("Dbservice :: filePreview :: error", error);
      }
    }
}

const dbService = new DbService();
