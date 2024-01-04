interface Props {
    type?: string;
    title?: string;
    state: string;
    placeholder: string;
    setState: (value: string) => void;
    required?: boolean;
    textarea?: boolean;
}

const InputField = ({ type, title, state, placeholder, setState, required, textarea }: Props) => {
    return (
        <div className="input">
            {title &&
                <label className={`input__label ${required ? "input__label--required" : ""}`}>{title}</label>
            }
            {textarea ? 
            <textarea cols={50} rows={5}
                className="input__field"
                placeholder={placeholder}
                required={required}
                value={state}
                onChange={(e) => setState(e.target.value)}
            ></textarea> 
            :
            <input
                className="input__field"
                type={type || "text"}
                placeholder={placeholder}
                required={required}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            }
        </div>
    )
}

export default InputField;