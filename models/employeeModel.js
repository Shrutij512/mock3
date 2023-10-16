const mongoose = require("mongoose");

const employeeSchema = ({
    email: { type: String, required: true },
    salary: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    user_id: { type: String, required: true }
})

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = { EmployeeModel };