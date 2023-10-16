const express = require("express");

const { EmployeeModel } = require("../models/employeeModel");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const employeeData = await EmployeeModel.find();
        res.send(employeeData);
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
});

router.post("/create", async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        await EmployeeModel.create({ firstName, lastName, email, password });
        res.send({ message: "Employee created successfully!" });
    } catch (error) {
        console.log(error)
        res.send("Error")
    }
})

module.exports = { router }