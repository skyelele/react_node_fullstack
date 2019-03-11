const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        // add new property called profile in the
        // request (req) object
        req.profile = user;
        next();
    });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth_id;
    if(!authorized) {
        return req.status(403).json({
            error: "User is not authorized to perform this action."
        });
    }
};