import mongoose from "mongoose";

//Type Definition (TypeScript ka part): Code ko clear banata hai aur batata hai ki connection object kaisa hona chahiye.
//Yeh ek type define kar raha hai, jiska naam ConnectionObject hai.
//agar ConnectionObject mein isConnected property hai to vo number type ki hi hogi
type ConnectionObject = {
  isConnected?: number;
};

//Ek constant object connection banaya gaya hai, jo ConnectionObject type ko follow karta hai.  Yeh object database connection ki state ko store karega. Shuruaat mein, yeh khaali hai kyunki abhi tak connection establish nahi hua.

const connection: ConnectionObject = {};

// Yeh batata hai ki function ek Promise return karega jo kuch value return nhi karega.
//ts mein return type of function : lagane ke baad define karte hai
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    //Future mein check karne ke liye ki connection establish hua ya nahi.
    connection.isConnected = db.connections[0].readyState;

    console.log("DB: ", db);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Database connection failed ", error);
    process.exit(1);
  }
}

export default dbConnect;
