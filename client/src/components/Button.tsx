interface Props {
  size?: string,
  color?: string,
  icon?: string,
  text: string
}

const Button = ({size, color, icon, text} : Props) => {
  return (
    <button className={`button button--${size} button--${color}`}>
      <img src={icon} />
      {text}
    </button>
  )
}

export default Button
