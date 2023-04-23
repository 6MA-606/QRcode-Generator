import React from "react";
import styles from './input.module.css';

class ColorInput extends React.Component {
    constructor(props) {
        super(props);
        const {label, id, className, base} = props;

        this.state = {
            label: label,
            value: base,
            id: id,
            className: className
        };
        this.change = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {

        const refClassName = text => (text === undefined || text === '') ? '' : ' ' + text;

        return (
            
            <div id={ this.state.id + 'Block'}>
                <label className={ styles.label } htmlFor={ this.state.id }>{ this.state.label }</label>
                <input className={ styles.input + refClassName(this.state.className) } type='text' value={ this.state.value } onChange={ this.change } id={ this.state.id + 'Input'} />
                <input className={ styles.input + refClassName(this.state.className) } type='color' value={ this.state.value } onChange={ this.change } id={ this.state.id + 'Picker' } />
                <label htmlFor={ this.state.id + 'Picker' }>
                    <span className={ styles.customColorPicker } style={{ backgroundColor: this.state.value }}></span>
                </label>
            </div>
        );
    }
};

export default ColorInput;