import { useState } from "react";
import classNames from "classnames";

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
        className={classNames("textBox-text px-3 py-2 w-64 h-20 text-base border border-gray-300 rounded resize-none isolate", className)}
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
    <div id={id + "Block"} className="flex items-center mx-0 my-1">
      <label
        htmlFor={id}
        className={"colorInput-label mr-2 font-semibold isolate"}
      >
        {label}
      </label>
      <div className="flex items-center gap-1">
        <input
          className={classNames("colorInput-text px-2 py-1 w-24 text-base border border-gray-300 rounded isolate", className)}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          id={id + "Input"}
        />
        <label htmlFor={id + "Picker"}>
          <div
            className={classNames("colorInput-color w-5 h-5 border border-gray-300 rounded transition-colors cursor-pointer isolate", className)}
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
