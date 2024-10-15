import { Router } from "express";
const routerU = Router();
import { userMiddleware } from "../middleware/userMiddleware.js";
import { User } from "../db/DBindex.js";
import { Course } from "../db/DBindex.js";

routerU.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username,
    password,
  })
    .then(function () {
      res.json({
        msg: "user created successfully",
      });
    })
    .catch(function () {
      res.json("user not created");
    });
});

routerU.get("/courses", (req, res) => {
  Course.find({}).then(function (response) {
    res.json({
      courses: response,
    });
  });
});

routerU.post("/courses/:courseId", userMiddleware, (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  User.updateOne(
    {
      username: username,
    },
    {
      $push: { purchasedCourses: courseId },
    }
  ).catch(function (e) {
    console.log(e);
  });
  res.json({
    msg: "purchase complete",
  });
});

routerU.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

export { routerU };
