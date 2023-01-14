import { MongoClient } from "mongodb";
import { projectSchema } from "../schema/projectSchema.js";
import { taskSchema } from "../schema/taskSchema.js";
import dotenv from "dotenv";

dotenv.config();

//  Database name
const database = "todoList";

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URL);

// Connect database

// Create collections if not exist
const createCollections = async (collection, schema) => {
  try {
    const result = await client.connect();
    const db = result.db(database);
    const collections = await db.listCollections().toArray();
    const names = collections.map((collection) => {
      return collection.name;
    });
    if (!names.includes(collection)) {
      await db.createCollection(collection, { validator: schema });
    }
    await client.close();
    return;
  } catch (err) {
    console.log("error from collection", err);
  }
};

// helper function to create the collection

(async () => {
  console.log("Creating collections...");
  await Promise.all([
    createCollections("tasks", taskSchema),
    createCollections("projects", projectSchema),
  ]);
  console.log("Collections created");
  process.exit();
})();
