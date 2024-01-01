interface Props {
  size?: string,
  color?: string,
  text: string
}

const Button = ({size, color, text} : Props) => {
  return (
    <button className={`button button--${size} button--${color}`}>
      {text}
    </button>
  )
}

export default Button
