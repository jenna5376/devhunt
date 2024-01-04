import express, { Router } from 'express';
import {Request, Response} from 'express';
import User from '../models/Users';

const router: Router = express.Router();

router.post('/edit', async (req: Request, res: Response) => {
	const profileInfo = {...req.body}
	let k: keyof typeof profileInfo;
    for (k in profileInfo) {
        if (k === 'id'){
            delete profileInfo[k];
        }
    }

	const updatedUser = await User.findOneAndUpdate( 
		{id: req.body.uid}, 
		{$set: profileInfo}, 
		{new: true}
	);
	console.log(updatedUser)
	res.status(201).json(updatedUser);
})

export default router;