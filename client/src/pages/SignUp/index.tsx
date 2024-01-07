import { useState } from "react"
import gradient from "../../assets/gradient.png"
import dIcon from "../../assets/devfolio-icon-black.svg"
import dIconDark from "../../assets/devfolio-icon-white.svg"
import Button from "../../components/Button"
import InputField from "../../components/InputField"
import google from "../../assets/google.svg"
import github from "../../assets/github.svg"
import githubDark from "../../assets/github-dark.svg"

interface Props {
	isDark: boolean
}

const SignUp = ({isDark}: Props) => {

const [email, setEmail] = useState("");
function googleAuth(){
	window.open("http://localhost:4000/auth/google", "_self")
}
function githubAuth(){
	window.open("http://localhost:4000/auth/github", "_self")
}

return (
	<div className="signup">
		<div className="signup__col">
			<div className="signup__block">
			<div className="signup__top">
				<div className="signup__icon">
				<img src={isDark ? dIconDark : dIcon} alt="" />
				</div>
				<h1>Sign Up On Devhunt</h1>
				<p>Join our community of talented developers and find inspirations for your next project</p>
			</div>
				<div className="signup__buttons">
				<Button
					color="secondary"
					icon={google}
					text="Sign up with Google"
					onclick={googleAuth}
					size="large"
				/>
				<Button
					color="secondary"
					icon={isDark ? githubDark : github}
					text="Sign up with GitHub"
					onclick={githubAuth}
					size="large"
				/>
				<p className="signup__or">or</p>
				</div>
				<form className="signup__form">
				<InputField
					state={email}
					placeholder="Email address"
					setState={setEmail}
				/>
				<Button
					text="Sign up"
				/>
			</form>
			</div>
		</div>
		<div className="signup__col">
			<img className="signup__gradient" src={gradient} />
		</div>
	</div>
	) 
}

export default SignUp
