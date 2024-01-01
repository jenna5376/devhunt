interface Props {
    title: string,
    value: string,
    checked: boolean,
    handleChange: (value: string) => void
}

const RadioButton = ({ title, value, checked, handleChange }: Props) => {
    return (
        <label className="radio">
            <input 
                className="radio__input"
                type="radio" 
                value={value} 
                onChange={(evt) => handleChange(evt.target.value)}
                checked={checked}
            />
            <span className="radio__label">{title}</span>
        </label>
    )
}

export default RadioButton
