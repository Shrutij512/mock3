const express = require('express');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { connection } = require('./config/db');
const { UserModel } = require("./models/userModel");
const { router } = require("./Routes/data")
const { Authentication } = require("./middleware/Authentication")

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.get('/', (req, res) => {
    res.send("Welcome , this is the base api endpoint");
});

app.post("/signup", async(req, res) => {
    try {
        const { email, password } = req.body;
        bcrypt.hash(password, 5, async function(err, hash) {
            await UserModel.create({ email, password: hash });
            res.send({ message: "User signed up successfully!" });
        });
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
});

app.post("/login", async(req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.send({ message: "Please signup first !" });
    }
    const hash = user.password

    bcrypt.compare(password, hash, async function(err, result) {
        if (result) {
            const token = jwt.sign({ employeeId: user._id }, process.env.SECRET_TOKEN);
            res.send({ message: "Login successfull", token: token })
        } else {
            res.send({ message: "Login failed !" });
        }
    });
})

app.use(Authentication);
app.use("/employeeData", router);

app.listen(PORT, async() => {
    try {
        await connection;
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log("Error connecting mongoDB");
        console.log(error)
    }
    console.log(`Listening on port ${PORT}`);
})