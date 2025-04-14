import { Router } from 'express';
import { addReaction, removeReaction } from '../../controllers/reactionController.js';

const router = Router();

// Route to add a reaction to a specific thought
// POST /thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', addReaction);

// Route to remove a specific reaction from a thought
// DELETE /thoughts/:thoughtId/reactions/:reactionId
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;