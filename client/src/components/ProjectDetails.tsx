import { CalendarIcon, HeartIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"

interface Props {
	id: string
}

const ProjectDetails = ({id}: Props) => {
	
	const [owner, setOwner] = useState("mongodb-developer")
	const [repo, setRepo] = useState("mern-stack-example")

	type ProjectDet = {
        title: string;
        date: number;
        github: string;
        image: string;
        website: string;
        readmeMd: string;
        readme: boolean;
		tags: [];
		contributors: [];
    };

    const [projectDet, setProjectDet] = useState<ProjectDet>({
        title: '',
        date: Date.now(),
        github: '',
        image: '',
        website: '',
        readmeMd: '',
        readme: false,
		tags: [],
		contributors: []
    })


	const fetchData = () => {
		//repo readme
		fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				console.log(decodeURIComponent(atob(data.content)));
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			});
			
		fetch(`https://api.github.com/repos/${owner}/${repo}/topics`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.names)
			});
	}

	return (
		<div className="modal">
		<div className="project-det">
			<main>
				<header>
				<h1>Creative South</h1>
				<div className="project-det__info">
					<div className="project-det__metadata">
					<CalendarIcon className="icon-x-small" />
					<span>Yesterday</span>
					</div>
				</div>
				</header>
				<article>
				<div className="project-det__image">
					<img />
				</div>
				<p>We recently launched the MVP site for Creative South, featuring some amazing illustrations from our team. We had a ton of fun creating a new world for the upcoming conference. Fun fact, this site was just featured on the big screen during the keynote at this year's Webflow Conference. We can't wait to share what else we have in the works. You can get your early bird tickets now! Join us March 30 - April 1, 2023 in Columbus, GA.</p>
				</article>
			</main>
			<aside>
				<p>Links</p>
				<p>Languages</p>
				<p>Contributors</p>
			</aside>
			</div>
		</div>
	)
}

export default ProjectDetails
