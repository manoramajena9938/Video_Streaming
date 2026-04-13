const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://cse23bcse34_db_user:lDzDTYG7NyZ3iDGX@cluster0.yngodbo.mongodb.net/register")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});