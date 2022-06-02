const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();


exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    let currentUser;

    await User.findUser(username).then(user => {
        if (!user) {
            return res.status(401).json({ message: "Foydalanuvchi topilmadi!" });
        }
        currentUser = user;
        return bcrypt.compare(password, user.password);
    })
        .then(doMatch => {
            if (!doMatch) {
                return res.status(401).json({ message: "Parol xato!" });
            }

            const token = jwt.sign({
                username: currentUser.username,
                userId: currentUser._id,
            },
                "mysecr8yGU&a=?k$&NpQzt9ev&kE=TPB7+HNAf7@kYd=EhUncxKhP&uC4aPN%GwZtM5v4?tWET4yN=Y263V3xd-uZ*EaN%et",
                { expiresIn: "1h" }
            );

            res.status(201).json({
                token: token,
                user: {
                    username: currentUser.username,
                    id: currentUser._id,
                },
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.signup = async (req, res, next) => {
    const { username, password, confirmPassword } = req.body;

    await User.findUser(username).then(user => {
        if (!user) {
            if (password === confirmPassword) {
                const user = new User(username, password);
                user.save();
                return res.status(200).json({ message: "Foydalanuvchi tuzildi!" });
            } else {
                return res.status(400).json({ message: "Parol mos kelmadi!" });
            }
        } else {
            return res.status(400).json({ message: "Ushbu username band!" });
        }
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};