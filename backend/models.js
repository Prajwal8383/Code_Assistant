const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  
const User=mongoose.model("User",userSchema);


const savedEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SavedEntry = mongoose.model('SavedEntry', savedEntrySchema);
module.exports = {User, SavedEntry};
