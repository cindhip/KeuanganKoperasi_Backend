const AdminSchema = require("../models/adminModel");

exports.login = async (req, res) => {
  const { name, password } = req.body;

  AdminSchema.findOne({ name: name }).then((user) => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    if (user.password == password) {
      const token = "initoken";
      return res.json({
        success: true,
        message: "Berhasil",
        data: {
          user,
          token,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password salah",
      });
    }
  });
};
