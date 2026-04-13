const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
