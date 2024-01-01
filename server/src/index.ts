import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import './config/config';

import path from 'path';
import postRoutes from './routes/posts';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DSN || '')
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));
