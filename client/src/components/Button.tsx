type SizeTypes = "small"|"large";
type ColorTypes = "primary"|"secondary"|"tertiary"|"warning";

interface Props {
  size?: SizeTypes,
  color?: ColorTypes,
  icon?: string,
  text: string,
  fullWidth?: boolean,
  onclick?: () => void;
}

const Button = ({size, color, icon, text, fullWidth, onclick} : Props) => {
  return (
    <button 
      className={`btn ${size ? `btn--${size}` : ''} ${color ? `btn--${color}` : ''}`}
      onClick={onclick}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  )
}

export default Button
