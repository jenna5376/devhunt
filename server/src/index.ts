import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import './config/config';
import './config/passport';
const cookieSession = require('cookie-session');
import multer from 'multer';


import path from 'path';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile'

import { Request, Response } from 'express';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cookieSession({
		name: 'session',
		keys: ['devhunt'],
		maxAge: 30 * 24 * 60 * 60 * 100,
	})
);
app.use(passport.initialize());
app.use(passport.session())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
}))

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/profile', profileRoutes);

import Post from './models/Posts';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

//create interface for this

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file?.filename)
    const post = JSON.parse(req.body.data)
    post.image = req.file?.filename
    console.log(post);

    const newPost = new Post(post);

    try {
        await newPost.save();
        console.log(newPost)
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
})

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DSN || '')
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));