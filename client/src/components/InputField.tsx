interface Props {
    type?: string;
    title?: string;
    state: string;
    placeholder: string;
    setState: (value: string) => void;
    required?: boolean;
}

const InputField = ({ type, title, state, placeholder, setState, required }: Props) => {
    return (
        <div className="input">
            <label className={`input__label ${required ? 'input__label--required' : ''}`}>{title}</label>
            <input
                className="input__field"
                type={type || "text"}
                placeholder={placeholder}
                required={required}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    )
}

export default InputField;