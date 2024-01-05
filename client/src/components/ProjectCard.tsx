import { Link } from "react-router-dom";
import { HeartIcon, EyeIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import ProjectDetails from "./ProjectDetails";
import { Post } from "../models/models";

interface Props {
    postId: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    user?: any;
    likes: number;
    views: number;
    liked: Array<String>;
    setLiked: (val: Array<String>) => void
};

const ProjectCard = ({ postId, image, title, name, avatarUrl, user, likes, views, liked, setLiked }: Props) => {

    const [openModal, setOpenModal] = useState(false)

    function incrementHeart(evt: React.SyntheticEvent){
        evt.preventDefault();
        evt.stopPropagation();

        if (user){

        const likeProject = async (postId: string, userId: string) => {
            try {
                const response = await axios.put("http://localhost:4000/posts/like", {
                    postId,
                    userId
                });
                setLiked(response.data.user.likedPosts)
            } catch (err) {
                console.log(err);
            }
            };
            likeProject(postId, user._id)
        }
    }

    const isLiked = (id: string) => liked.includes(id)

    isLiked(postId)

    return (
        <div key={postId}>
            {openModal && <ProjectDetails id={postId} />}
            {/* <Link to={`/project/${postId}`}> */}
                <div className="project-card" onClick={() => setOpenModal(true)}>
                    <div className="project-card__cover">
                        <img className="project-card__img" src={`http://localhost:4000/images/${image}`} />
                        <div className="project-card__buttons">
                            <div className="project-card__button" onClick={(evt) => incrementHeart(evt)}>
                                {isLiked(postId) ?
                                    <FilledHeartIcon className="icon-small filled-heart" />
                                    :
                                    <HeartIcon className="icon-small" />
                                }
                            </div>
                            <div className="project-card__button">
                                <ArrowUpRightIcon className="icon-small" />
                            </div>
                        </div>
                        <div className="project-card__avatar">
                            <img src={avatarUrl} />
                        </div>
                    </div>
                    <div className="project-card__stats">
                        <div className="project-card__stat">
                            <HeartIcon className="icon-x-small" />
                            <p>{likes}</p>
                        </div>
                        <div className="project-card__stat">
                            <EyeIcon className="icon-x-small" />
                            <p>{views}</p>
                        </div>
                    </div>
                    <p className="project-card__title">{title}</p>
                </div>
            {/* </Link> */}
        </div>
    )
}

export default ProjectCard
