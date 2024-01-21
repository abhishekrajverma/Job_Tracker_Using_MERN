const mongoose = require("mongoose");
require("dotenv").config();

main()
.then(() => console.log("Connected to Database :: MongoDB"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB);
}