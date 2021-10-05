import express from 'express';
import {getAuthors, addAuthor, updateAuthor, getAuthorById, deleteAuthor} from '../controllers/authorController.js'
import { protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

//  @desc   Fetch all Authors
//  @route  GET /api/authors
//  @acess  private
router.route("/")
.get(protect, getAuthors)
.post(protect, admin, addAuthor)

//  @acess  private
router.route("/:id")
.get(protect, admin, getAuthorById)
.put(protect, admin, updateAuthor)
.delete(protect, admin, deleteAuthor)

export default router;