import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
        
        .select("-__v");
        return res.status(200).json(thoughts);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving thoughts", error });
    }
};

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id)
        
        .select("-__v");

        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        return res.status(200).json(thought);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving thought", error });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newThought = await Thought.create({ thoughtText, username });

        await User.findByIdAndUpdate(
            user._id,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );

        return res.status(201).json({ message: "Thought created", thought: newThought });
    } catch (error) {
        return res.status(500).json({ message: "Error creating thought", error });
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }

        return res.status(200).json(thought);
    } catch (error) {
        return res.status(500).json({ message: "Error updating thought", error });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id });

        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }

        await User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: thought._id } },
            { new: true }
        );

        return res.status(200).json({ message: "Thought deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting thought", error });
    }
};
