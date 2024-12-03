// controllers/userController.js
const UserModel = require("../models/usersModel");

const userController = {
  
    sendOtp: async (req, res) => {
        const { phone } = req.body;
        //console.log("phone", phone);
        if (!phone) {
          return res.status(400).json({ error: "Phone number is required" });
        }
    
        try {
          // Check if the phone number exists in the database
          const userExists = await UserModel.findUserByPhone(phone);
          if (!userExists) {
            return res.status(404).json({ error: "Phone number not registered" });
          }
    
          // Generate a 6-digit OTP
          const otp = Math.floor(100000 + Math.random() * 900000);
    
          // Send OTP via SMS using Twilio
        //   await client.messages.create({
        //     body: `Your OTP for Spicy Mango is: ${otp}. Use it to log in. If not requested, ignore this message.`,
        //     from: twilioPhone,
        //     to: phone,
        //   });
    
          // Store OTP in the database
          await UserModel.storeOtp(phone, otp);
    
          res.status(200).json({ success: "OTP sent successfully" });
        } catch (error) {
          console.error("Error sending OTP:", error);
          res.status(500).json({ error: "Failed to send OTP" });
        }
      },
      verifyOtp: async (req, res) => {
        const { phone, otp } = req.body;
    
        if (!phone || !otp) {
          return res
            .status(400)
            .json({ error: "Phone number and OTP are required" });
        }
    
        try {
          const isOtpValid = await UserModel.verifyOtp(phone, otp);
    
          if (!isOtpValid) {
            return res.status(401).json({ error: "Invalid or expired OTP" });
          }
    
          // Generate JWT Token
          const token = jwt.sign({ phone }, "JWTSECREATEKEY_12", {
            expiresIn: "5h",
          });
    
          res.status(200).json({ success: "Login successful", token });
        } catch (error) {
          console.error("Error verifying OTP:", error);
          res.status(500).json({ error: "Failed to verify OTP" });
        }
      },
};

module.exports = userController;
