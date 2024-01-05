import {Request, Response} from 'express';
import User from '../models/Users';

export const editProfile = async (req: Request, res: Response) => {
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
	res.status(201).json(updatedUser);
}