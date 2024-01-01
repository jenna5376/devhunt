import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import passport from 'passport';
import './config/config';
import './passport';
const cookieSession = require("cookie-session");

import path from 'path';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cookieSession({
		name: "session",
		keys: ["devhunt"],
		maxAge: 30 * 24 * 60 * 60 * 100,
	})
);
app.use(passport.initialize());
app.use(passport.session())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
}))

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DSN || '')
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));