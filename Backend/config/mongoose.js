const mongoose = require("mongoose");

main()
.then(() => console.log("Connected to Database :: MongoDB"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/jobportal");

}