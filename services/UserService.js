const User = require('../models/User');

class UserService {
  async getAllUsers() {
    return await User.find({}, '-password'); // Omit the password from the response for security
  }

  async updateUserRole(userId, isAdmin) {
    return await User.findByIdAndUpdate(userId, { isAdmin }, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

module.exports = UserService;
