import express from "express";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { Admin } from "../db/DBindex.js";
import { Course } from "../db/DBindex.js";
const routerA = express.Router();

routerA.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username,
    password,
  })
    .then(function () {
      res.json({
        msg: "admin created successfully",
      });
    })
    .catch(function () {
      res.json("admin not created");
    });
});

routerA.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({
    msg: "course created successfully",
    courseId: newCourse._id,
  });
});

routerA.get("/courses", adminMiddleware, (req, res) => {
  Course.find({}).then(function (response) {
    res.json({
      courses: response,
    });
  });
});

export { routerA };
