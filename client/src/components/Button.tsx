//use union

interface Props {
  size?: string,
  color?: string,
  icon?: string,
  text: string, 
  onclick?: () => void;
}

const Button = ({size, color, text, onclick} : Props) => {
  return (
    <button 
      className={`button button--${size} button--${color}`}
      onClick={onclick}
    >
      {text}
    </button>
  )
}

export default Button
