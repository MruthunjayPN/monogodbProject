import { User } from "../db/DBindex.js";

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.json({
        msg: "User doesnt exist",
      });
    }
  });
}

export { userMiddleware };
