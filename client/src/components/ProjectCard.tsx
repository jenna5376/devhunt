import { Link } from "react-router-dom";
import { HeartIcon, EyeIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import axios from "axios";

interface Props {
    postId: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: any;
    likes: number;
    views: number;
};

const ProjectCard = ({ postId, image, title, name, avatarUrl, userId, likes, views }: Props) => {
    function incrementHeart(evt: React.SyntheticEvent){
        evt.preventDefault();
        evt.stopPropagation();

        const likeProject = async (postId: string, userId: string) => {
            try {
            const response = await axios.put("http://localhost:4000/posts/like", {
                postId,
                userId
            });
            console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        };
        likeProject(postId, userId)
    }
    return (
        <div key={postId}>
            <Link to={`/project/${postId}`}>
                <div className="project-card">
                    <div className="project-card__img">
                        <img src={image} />
                        <div className="project-card__buttons">
                            <div className="project-card__button" onClick={(evt) => incrementHeart(evt)}>
                                <HeartIcon className="icon-small" />
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
            </Link>
        </div>
    )
}

export default ProjectCard
