import { useState } from "react";
import classNames from "classnames";
import color from "./_colorInput.module.scss";

export const TextInput = (props) => {
  const { label, id, className, placeholder } = props;

  const [value, setValue] = useState("");

  return (
    <div id={id + "Block"}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={classNames("textInput-text", className)}
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export const TextBox = (props) => {
  const { label, id, className, placeholder, cols, rows } = props;

  const [value, setValue] = useState("");

  return (
    <div id={id + "Block"}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={classNames("textBox-text", className)}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export const ColorInput = (props) => {
  const { label, id, className, base } = props;

  const [value, setValue] = useState(base);

  return (
    <div id={id + "Block"} className={color.container}>
      <label
        htmlFor={id}
        className={classNames("colorInput-label", color.label)}
      >
        {label}
      </label>
      <div className={color.input}>
        <input
          className={classNames("colorInput-text", className)}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          id={id + "Input"}
        />
        <label htmlFor={id + "Picker"}>
          <div
            className={classNames("colorInput-color", className)}
            style={{ backgroundColor: value }}
          ></div>
        </label>
        <input
          style={{ width: 0, height: 0, opacity: 0 }}
          type="color"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          id={id + "Picker"}
        />
      </div>
    </div>
  );
};
