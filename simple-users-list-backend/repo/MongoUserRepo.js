// repo/MongoUserRepo.js
const connectDB = require("../db/mongo");
const { ObjectId } = require("mongodb");

class MongoUserRepo {
  async getAll() {
    const db = await connectDB();
    return db.collection("users").find({}).toArray();
  }
  async findByEmail(email) {
    const db = await connectDB();
    return db.collection("users").findOne({ email });
  }
  async add(user) {
    const db = await connectDB();
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    const result = await db.collection("users").insertOne(user);
    return { id: result.insertedId, name: user.name, email: user.email };
  }

  async delete(id) {
    const db = await connectDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
  }
}

module.exports = MongoUserRepo;

