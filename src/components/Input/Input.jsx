import { useState } from "react";
import classNames from "classnames";

export const TextInput = (props) => {
    const { label, id, className, placeholder } = props;

    const [value, setValue] = useState('');

    return (
        <div id={ id + 'Block'}>
            <label htmlFor={ id }>{ label }</label>
            <input id={ id } className={ classNames("textInput-text", className) } type="text" placeholder={ placeholder } onChange={ (e) => { setValue(e.target.value) } } value={ value }/>
        </div>
    );
}

export const ColorInput = (props) => {
    const {label, id, className, base} = props;

    const [value, setValue] = useState(base);

    return (
            
        <div id={ id + 'Block'}>
            <label htmlFor={ id }>{ label }</label>
            <input className={ classNames("colorInput-text", className) } type='text' value={ value } onChange={ (e) => { setValue(e.target.value) } } id={ id + 'Input'} />
            <input className={ classNames("colorInput-color", className) } type='color' value={ value } onChange={ (e) => { setValue(e.target.value) } } id={ id + 'Picker' } />
            <label htmlFor={ id + 'Picker' }>
                <span style={{ backgroundColor: value }}></span>
            </label>
        </div>

    );
}