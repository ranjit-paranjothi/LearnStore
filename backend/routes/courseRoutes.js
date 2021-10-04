import express from 'express';
import {getCourses, getCourseById, deleteCourse, createCourse, updateCourse} from '../controllers/courseController.js'
import { protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

//  @desc   Fetch all Courses
//  @route  GET /api/courses
//  @acess  public
router.route("/").get(getCourses)
.post(protect, admin, createCourse)

//  @desc   Fetch single Course
//  @route  GET /api/courses
//  @acess  public
router.route("/:id")
.get(getCourseById)
.delete(protect, admin, deleteCourse)
.put(protect, admin, updateCourse);

export default router;