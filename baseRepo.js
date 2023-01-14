import { MongoClient, ObjectId } from "mongodb";
import { createError } from "./error.js";
import dotenv from "dotenv";

dotenv.config();

//  Database name
const database = "todoList";

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URL);

const BaseRepo = {
  // Create
  async create(collection, newData) {
    try {
      await client.connect();
      return await client
        .db(database)
        .collection(collection)
        .insertOne(newData);
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Get all
  async getAll(collection, searchParams) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .find(searchParams)
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Get one
  async getOne(collection, id) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  async getAggregateData(collection, id) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .aggregate([
          {
            $lookup: {
              from: "tasks",
              localField: "project_id",
              foreignField: "_id",
              as: "tasks",
            },
          },
        ])
        .toArray();

      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Update
  async update(collection, newData, id) {
    try {
      await client.connect();
      const item = await client
        .db(database)
        .collection(collection)
        .findOne({ _id: new ObjectId(id) });
      if (!item) return createError(404, "Item not found");
      const result = await client
        .db(database)
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) }, { $set: newData }, { new: true });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Delete
  async delete(collection, id) {
    try {
      await client.connect();
      const item = await client
        .db(database)
        .collection(collection)
        .findOne({ _id: new ObjectId(id) });
      if (!item) return createError(404, "Item not found");
      await client
        .db(database)
        .collection(collection)
        .deleteOne({ _id: new ObjectId(id) });
      console.log("Data deleted");
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Search
  async search(collection, searchParams) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .find(searchParams)
        .limit(20)
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },

  // Filter
  async filter(collection, query) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .find({ status: query })
        .limit(20)
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // Sort
  async sort(collection, sortParams) {
    try {
      await client.connect();
      const result = await client
        .db(database)
        .collection(collection)
        .find()
        .sort(sortParams)
        .limit(20)
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default BaseRepo;
