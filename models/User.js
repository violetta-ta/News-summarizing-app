import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: [true, "Please enter the password"], select:false //this option prevents to show the password to client output

   }
});

const User = mongoose.model('User', userSchema);
export default User;