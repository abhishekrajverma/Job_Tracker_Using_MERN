import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // configure environment variables 

main() // call the main function
.then(() => console.log("Connected to Database :: MongoDB")) // if connection is successful, log the message 
.catch((err) => console.log(err));

async function main() { // main function to connect to the database 
    await mongoose.connect(process.env.MONGODB); // connect to the database using the connection string 
}

export default mongoose; // export the mongoose object