import {Router} from 'express';
const router = Router();

import { getAllThoughts, getThoughtById, createThought, updateThought,deleteThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
;

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

export default router;