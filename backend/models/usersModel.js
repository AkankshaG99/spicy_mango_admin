// models/userModel.js
const connection = require("../config/db");

// User model for interacting with the database
const UserModel = {
  create: (userData, callback) => {
    const query = `
      INSERT INTO users (fname, lname, phone, email, location, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const { fname, lname, phone, email, location, message } = userData;

    connection.query(
      query,
      [fname, lname, phone, email, location, message],
      (err, results) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return callback(err, null);
        }
        callback(null, results);
      }
    );
  },
  // Check if phone number exists
  findUserByPhone: (phone) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE phone = ?`;
      connection.query(query, [phone], (err, results) => {
        if (err) {
          console.error("Error checking phone number:", err);
          return reject(err);
        }
        resolve(results.length > 0); // Return true if phone exists
      });
    });
  },

  // Store OTP
  storeOtp: (phone, otp) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE users SET otp = ?, otp_expiry = DATE_ADD(NOW(), INTERVAL 5 MINUTE)
        WHERE phone = ?
      `;
      connection.query(query, [otp, phone], (err, results) => {
        if (err) {
          console.error("Error storing OTP:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  // Verify OTP
  verifyOtp: (phone, otp) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM users
        WHERE phone = ? AND otp = ? AND otp_expiry > NOW()
      `;
      connection.query(query, [phone, otp], (err, results) => {
        if (err) {
          console.error("Error verifying OTP:", err);
          return reject(err);
        }
        resolve(results.length > 0); // Return true if OTP is valid
      });
    });
  },
};

module.exports = UserModel;
