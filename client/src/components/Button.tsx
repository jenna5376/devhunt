type SizeTypes = "small"|"large";
type ColorTypes = "primary"|"secondary"|"tertiary"|"warning";

interface Props {
  size?: SizeTypes,
  color?: ColorTypes,
  icon?: string,
  fullWidth?: boolean,
  text: string,
  submit?: boolean,
  onclick?: () => void;
}

const Button = ({size, color, icon, fullWidth, text, submit, onclick} : Props) => {
  return (
    <button 
      type={submit ? "submit" : "button"}
      className={`btn ${size ? `btn--${size}` : ""} ${color ? `btn--${color}` : ""} ${fullWidth ? 'btn--full' : ""}`}
      onClick={onclick}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  )
}

export default Button
