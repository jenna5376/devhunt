//use union

interface Props {
  size?: string,
  color?: string,
  icon?: string,
  text: string,
  fullWidth?: boolean,
  onclick?: () => void;
}

const Button = ({size, color, icon, text, onclick} : Props) => {
  return (
    <button 
      className={`button button--${size} button--${color}`}
      onClick={onclick}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  )
}

export default Button
