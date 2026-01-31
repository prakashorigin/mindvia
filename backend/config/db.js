const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sharmaprakash:@Sharma01#@cluster0.xxxxx.mongodb.net/mindviaDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Atlas Connected");
});

module.exports = mongoose;
