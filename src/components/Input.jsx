import { useState } from "react";
import classNames from "classnames";

export const TextInput = (props) => {
  const { label, id, className, placeholder, onChange } = props;

  return (
    <div id={id + "Block"}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={classNames("textInput-text", className)}
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export const TextBox = (props) => {
  const { label, id, className, placeholder, cols, rows, onChange } = props;

  return (
    <div id={id + "Block"}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={"w-64 h-20 px-3 py-2 text-base transition-colors bg-white border rounded resize-none textBox-text border-neutral-300 isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500" + " " + className}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        onChange={onChange}
      />
    </div>
  );
};

export const ColorInput = (props) => {
  const { label, id, value, onChange } = props;

  return (
    <div id={id + "Block"} className="flex items-center mx-0 my-1">
      <label
        htmlFor={id}
        className="mr-2 font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50"
      >
        {label}
      </label>
      <div className="flex items-center gap-1">
        <input
          className="w-24 px-2 py-1 text-base transition-colors bg-white border border-gray-300 rounded colorInput-text isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500"
          type="text"
          value={value}
          onChange={onChange}
          id={id + "Input"}
        />
        <label htmlFor={id + "Picker"}>
          <div
            className="w-5 h-5 transition-colors border border-gray-300 rounded cursor-pointer colorInput-color isolate dark:border-neutral-500"
            style={{ backgroundColor: value }}
          ></div>
        </label>
        <input
          style={{ width: 0, height: 0, opacity: 0 }}
          type="color"
          // value={value}
          onChange={onChange}
          id={id + "Picker"}
        />
      </div>
    </div>
  );
};
