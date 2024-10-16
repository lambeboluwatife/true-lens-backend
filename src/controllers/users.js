const User = require("../models/User");
const { authSchema } = require("../utils/validationSchema");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const { sendWelcomeEmail } = require("../utils/sendEmails");

exports.registerUser = async (req, res) => {
  try {
    const validInputs = await authSchema.validateAsync(req.body);

    User.findOne({ email: validInputs.email }).then((user) => {
      if (user) {
        return res.status(409).json({
          success: false,
          error: "Email address already exist. Please use a different email.",
        });
      } else {
        const newUser = new User({
          ...validInputs,
        });

        // Mash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            const savedUser = await newUser.save();

            res.status(201).json({
              message: "Account created",
              userId: savedUser._id,
              username: savedUser.username,
            });

            sendWelcomeEmail(savedUser);
          })
        );
      }
    });
  } catch (error) {
    if (error.isJoi) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  })(req, res, next);
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
