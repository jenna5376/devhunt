export interface Post {
    title: string;
    image: string;
    creator: string,
    creatorAvatar: string,
    github: string;
    website: string;
    viewCount: number;
    likeCount: number;
    createdAt: Date;
    readme: boolean;
    _id: string;
}

export interface User {
    name: string;
    email: string;
    avatar: string;
    googleId: number;
    githubId: number;
    likedPosts: Array<Post>;
    followers: Array<User>;
    following: Array<User>;
    about: string;
    publicEmail: string;
    github: string;
    website: string;
    _id: string;
}