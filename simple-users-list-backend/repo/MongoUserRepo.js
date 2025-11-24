// repo/MongoUserRepo.js
const connectDB = require("../db/mongo");
const { ObjectId } = require("mongodb");

class MongoUserRepo {
  static async getAll() {
    const db = await connectDB();
    return db.collection("users").find({}).toArray();
  }

  static async add(name) {
    const db = await connectDB();
    const result = await db.collection("users").insertOne({ name });
    return { id: result.insertedId, name };
  }

  static async delete(id) {
    const db = await connectDB();
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    return true;
  }
}

module.exports = MongoUserRepo;
