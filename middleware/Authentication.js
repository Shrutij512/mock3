const jwt = require('jsonwebtoken');
require("dotenv").config();

const Authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            res.send({ message: "Please login first !" });
        }
        req.employeeId = decoded.employeeId;
        next();
    });
}

module.exports = { Authentication }