type SizeTypes = "small"|"large";
type ColorTypes = "primary"|"secondary"|"tertiary"|"warning";

interface Props {
  size?: SizeTypes,
  color?: ColorTypes,
  icon?: string,
  text: string,
  submit?: boolean,
  fullWidth?: boolean,
  onclick?: () => void;
}

const Button = ({size, color, icon, text, submit, fullWidth, onclick} : Props) => {
  return (
    <button 
      type={submit ? "submit" : "button"}
      className={`btn ${size ? `btn--${size}` : ""} ${color ? `btn--${color}` : ""}`}
      onClick={onclick}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  )
}

export default Button
