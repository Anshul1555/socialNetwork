import { Thought } from '../models/index.js';
import User from '../models/User.js';
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select('-__v');
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving users', error });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id }).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else {
            return res.status(200).json(user);
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving user', error });
    }
};
// Create User 
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        return res.status(200).json({ message: 'User created', user: dbUserData });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// Update User
export const updateUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json({ message: 'User created', user: dbUserData });
        return;
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// Delete User
export const deleteUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        await Thought.deleteMany({ username: dbUserData.username });
        // Remove user from friends list of other users
        await User.updateMany({ friends: req.params.id }, { $pull: { friends: req.params.id } });
        return res.json({ message: 'User successfully deleted!' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// Add Friend
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        // Add the friendId to the user's friends list if it's not already there
        const user = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { runValidators: true, new: true });
        const friend = await User.findOneAndUpdate({ _id: friendId }, { $addToSet: { friends: userId } }, { runValidators: true, new: true });
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        // Return the updated user object
        res.json({ message: 'Friend added successfully', user });
        return;
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding friend', error });
    }
};
// Remove Friend
export const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        // Remove the friendId from the user's friends list
        const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { runValidators: true, new: true });
        const friend = await User.findOneAndUpdate({ _id: friendId }, { $pull: { friends: userId } }, { runValidators: true, new: true });
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        // Return the updated user object
        res.json({ message: 'Friend removed successfully', user });
        return;
    }
    catch (error) {
        return res.status(500).json({ message: 'Error removing friend', error });
    }
};
