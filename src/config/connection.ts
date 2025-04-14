import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydatabase');

export default mongoose.connection;