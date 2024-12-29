const Member = require("../models/memberModel")

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('loans').populate('savings');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('loans').populate('savings');
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update member by ID
exports.updateMemberById = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMemberSavingsById = async (req, res) => {
  try {
    const { savings } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $push: { savings: savings } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMemberLoansById = async (req, res) => {
  try {
    const { loans } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $push: { loans: loans } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete member by ID
exports.deleteMemberById = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMemberSavingsById = async (req, res) => {
  try {
    const savings = req.query.savings;  // Mengambil ID dari saving yang ingin dihapus
    const memberId = req.params.id;

    // Mencari member berdasarkan ID
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Menghapus saving dari array savings
    member.savings.pull(savings);

    // Menyimpan perubahan
    await member.save();

    // Mengirim response dengan member yang sudah diupdate
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};