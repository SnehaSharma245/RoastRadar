import mongoose, { Schema, Document } from "mongoose";

//Document: Mongoose ka interface jo ek MongoDB document ko represent karta hai aur ismein kuch built-in properties hoti hain.

//Schema: MongoDB documents ke structure ko define karne ke liye Mongoose ka ek feature.

//Interface TypeScript ka ek feature hai jo blueprint provide karta hai ki ek object, class, ya function kaisa dikhna chahiye. Yeh define karta hai ki kisi cheez ke andar kya-kya properties aur unka type hona chahiye, lekin iska implementation nahi deta.

//Ye interface TypeScript ko batata hai ki Message document mein do fields hone chahiye: content (a string) aur createdAt (a Date).

//export interface: TypeScript ka syntax jo ek object ke structure ko define karta hai.
//Message is a Document

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// : Schema<Message>:

// Yeh TypeScript ka type annotation hai.
// Schema<Message>: Batata hai ki MessageSchema ek Mongoose schema hai jo Message interface ke rules ko follow karega.
// Iska matlab MessageSchema ke andar wahi fields allowed hain jo Message interface mein define ki gayi hain:

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

//mongoose.Model
// Yeh ek TypeScript ka type/interface hai jo batata hai ki koi bhi model ka structure kaisa hoga.

// mongoose.model
// Yeh ek function hai jo model banane ke liye use hota hai.

//mongoose.models
// Yeh ek object hai jisme saare already created models store hote hain.
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
