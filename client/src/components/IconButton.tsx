interface Props {
    color?: string,
    icon: string
}

const IconButton = ({color, icon}: Props) => {
  return (
    <button className={`icon-btn icon-btn--${color}`}>
        <img src={icon} />
    </button>
  )
}

export default IconButton
