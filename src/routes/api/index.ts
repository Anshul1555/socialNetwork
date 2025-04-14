import {Router} from 'express';
const router = Router();

import reactionRoutes from './reactionRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
import userRoutes from './userRoutes.js';

// /users
router.use('/users', userRoutes);
// /thoughts
router.use('/thoughts', thoughtRoutes);
// /thoughts/:thoughtId/reactions
router.use('/thoughts', reactionRoutes);

export default router;
