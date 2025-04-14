import Thought from "../models/Thought.js"; // Only Thought is needed
import { Types } from "mongoose"; // Import Types for ObjectId

export const addReaction = async (req: any, res: any) => {
    try {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;

        // Build the new reaction object inline
        const newReaction = {
            reactionBody,
            username,
            createdAt: new Date(), // Will be formatted with a getter in schema
            reactionId: new Types.ObjectId() // Add this if your schema includes reactionId
        };

        // Push the reaction into the Thought's reactions array
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: newReaction } },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        return res.status(201).json({ message: "Reaction added", thought: updatedThought });
    } catch (error) {
        return res.status(500).json({ message: "Error adding reaction", error });
    }
};

export const removeReaction = async (req: any, res: any) => {
    try {
        const { thoughtId, reactionId } = req.params;

        // Pull the reaction from the Thought's reactions array by reactionId
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: "Thought not found or Reaction not found" });
        }

        return res.status(200).json({ message: "Reaction removed", thought: updatedThought });
    } catch (error) {
        return res.status(500).json({ message: "Error removing reaction", error });
    }
};
