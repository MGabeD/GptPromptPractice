const express = require("express");
// const openai = require("openai");
// const openai = require('./utils/openai');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const TOKEN = require('./utils/token');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO || "129.114.27.13:27017/gpt";

// APIs routes
const gptRoutes = require("./routes/Gpt.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const attemptRoutes = require("./routes/attempts.js")


// openai.apiKey = TOKEN;

app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// Export the openai constant
// module.exports = {
//   openai,
// };

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
async function main() {
    // console.log("mongodb://" + MONGO);
    await mongoose.connect("mongodb://" + MONGO);
    // await mongoose.connect("mongodb://localhost:27017/test");
} 
  
// Listen to APIs
app.use("/api/gpt", gptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attempts", attemptRoutes);
// Read the README for a detailed description on how to use and what data is necessary

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
