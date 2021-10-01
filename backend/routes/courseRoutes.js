import express from 'express';
import {getCourses, getCourseById} from '../controllers/courseController.js'

const router = express.Router();

//  @desc   Fetch all Courses
//  @route  GET /api/courses
//  @acess  public
router.route("/").get(getCourses);

//  @desc   Fetch single Course
//  @route  GET /api/courses
//  @acess  public
router.route("/:id").get(getCourseById);

export default router;