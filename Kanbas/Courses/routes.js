// import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  }

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  }

  const findAllCourses = async (req, res) => {
    let courses = [];
    if (req.session.currentUser === undefined) {
      courses = await dao.findAllCourses();
    } else {
      courses = await dao.findCoursesForUser(req.session.currentUser.registeredCourses);
    }
    res.json(courses);
  }

  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  }

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  }

  const findCourseNumber = async (req, res) => {
    const { courseId } = req.params;
    const courseNumber = await dao.findCourseNumber(courseId);
    res.json(courseNumber);
  }

  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/CourseNumber", findCourseNumber);

  // app.get("/api/courses", (req, res) => {
  //   const courses = Database.courses;
  //   res.send(courses);
  // });

  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body,
  //     _id: new Date().getTime().toString() };
  //   Database.courses.push(course);
  //   res.send(course);
  // });

  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses
  //     .filter((c) => c._id !== id);
  //   res.sendStatus(204);
  // });

  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = req.body;
  //   Database.courses = Database.courses.map((c) =>
  //     c._id === id ? { ...c, ...course } : c
  //   );
  //   res.sendStatus(204);
  // });

  // app.get("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = Database.courses
  //     .find((c) => c._id === id);
  //   if (!course) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   res.send(course);
  // });

}