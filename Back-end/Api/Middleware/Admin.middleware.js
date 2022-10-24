const db = require("../../Model/AdminModel/Admin.model");
const Admin = db.Admin_schema


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Admin.findOne({
    AdminUsername: req.body.AdminUsername
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    
    next();
  });
};
