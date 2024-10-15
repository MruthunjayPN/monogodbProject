import { Router } from "express";
const routerU = Router();
import userMiddleware from "../middleware/userMiddleware.js";
import { User, Course } from "../db/DBindex.js";
//using {} bcz dbindex exports more than 1 module

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
  // console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

export default routerU;

// export default *export-module-name*
//is used to export a single thing from a module, and it allows flexibility when importing. - i.e you can change the name of the imported default export to anything you like when importing it in another file.

//Router: Express' Router is a modular, mini version of an Express application. It can handle routes, middleware, and other route-related logic.
// Usage: to create routes that can be isolated and modular. For example, if you have different parts of your application (such as users, products, or posts), you can organize each set of routes into its own router to keep the code clean and modular.
