import mongoose from "mongoose";
import { number, string } from "zod";

mongoose.connect(
  "mongodb+srv://mpn:Muttu%401511@courseapp.elmem.mongodb.net/course_selling_app"
);

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Courses = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", Courses);

export { Admin, User, Course };
