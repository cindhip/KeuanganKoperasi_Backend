const AdminSchema = require("../models/adminModel")

exports.getAdmin = async (req, res) => {
    try {
        const admin = await AdminSchema.find()
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({message: `Error ngafs ${error}`})
    }
}