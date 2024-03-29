import classNames from "classnames";
import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import { TruncateText } from "./TruncateText";

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
      <div>{label}</div>
      <textarea
        id={id}
        className={
          "w-full h-20 px-3 py-2 text-base transition-colors bg-white border rounded resize-none textBox-text border-neutral-300 isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500" +
          " " +
          className
        }
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
    <div id={id + "Block"} className="flex flex-col mx-0 my-1">
      <div className="mb-1 text-xs font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50">
        {label}
      </div>
      <div className="flex items-center">
        <input
          className="w-24 px-2 py-1 mr-1 text-base transition-colors bg-white border border-gray-300 rounded colorInput-text isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500"
          type="text"
          value={value}
          onChange={onChange}
          id={id + "Input"}
        />
        <label htmlFor={id + "Picker"}>
          <div
            className="w-5 h-5 border border-gray-300 rounded cursor-pointer colorInput-color isolate dark:border-neutral-500"
            style={{ backgroundColor: value }}
          ></div>
        </label>
        <input
          style={{ width: 0, height: 0, opacity: 0 }}
          type="color"
          onChange={onChange}
          id={id + "Picker"}
        />
      </div>
    </div>
  );
};

export const FileInput = (props) => {
  const { label, id, className, onChange, filetypes, style } = props;

  const [filename, setFilename] = useState("");
  const filetypeArray = filetypes.split(",");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const filenameSplit = file.name.split(".");
    const filetype = filenameSplit[filenameSplit.length - 1];
    if (!filetypeArray.includes(filetype.toLowerCase())) {
      e.preventDefault();
      alert("Invalid file type! \nPlease upload a " + filetypeArray.join(", ") + " file.");
      return;
    }
    setFilename(file.name);
    onChange(file);
  };

  const handleClear = () => {
    clearInput();
    onChange(null);
  };

  const clearInput = () => {
    setFilename("");
    const input = document.getElementById(id + "Input");
    input.value = "";
  };

  return (
    <div id={id + "Block"} className={"flex flex-col mx-0 my-1" + className} style={style}>
      <div className="mb-1 text-xs font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50">
        {label}
      </div>
      <div className="flex items-center transition-colors bg-white border border-gray-300 rounded justify-centertext-base h-9 colorInput-text dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500">
        <label
          htmlFor={id + "Input"}
          className="flex items-center justify-center h-full cursor-pointer whitespace-nowrap"
          style={{ flex: "10" }}
        >
          {filename === "" ? (
            "Browse Image"
          ) : (
            <TruncateText text={filename} maxLength={10} keepExtension={true} />
          )}
        </label>
        <div
          className="flex items-center justify-center h-full"
          style={{ flex: "2" ,display: filename === "" ? "none" : "flex" }}
        >
          <XCircleFill
            className="transition-colors cursor-pointer hover:fill-red-400"
            onClick={handleClear}
          />
        </div>
        <input
          className="w-0 h-0"
          type="file"
          onChange={handleChange}
          id={id + "Input"}
        />
      </div>
    </div>
  );
};

export const RangeInput = (props) => {
  const { label, unit, id, min, max, step, value, onChange, hidden, disabled, style } =
    props;

  if (hidden) return null;

  return (
    <div id={id + "Block"} className="flex flex-col mx-0 my-1" style={style}>
      <div className="mb-1 text-xs font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50">
        {label}
      </div>
      <div className="flex items-center w-auto">
        <div
          className={
            "flex items-center justify-center mr-1 text-base transition-colors colorInput-text isolate dark:text-neutral-200" +
            (disabled ? " opacity-50" : "")
          }
          style={{ flex: "1" }}
        >
          {value}
          {unit}
        </div>
        <div className="flex items-center justify-center" style={{ flex: "4" }}>
          <input
            className="w-full px-2 py-1 mr-1 text-base transition-colors bg-white border border-gray-300 rounded disabled:opacity-50 colorInput-text isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            id={id + "Range"}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export const OptionInput = (props) => {
  const { label, id, options, onChange, defaultValue } = props;

  return (
    <div id={id + "Block"} className="flex flex-col mx-0 my-1">
      <div className="mb-1 text-xs font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50">
        {label}
      </div>
      <select
        className="w-auto px-2 py-1 text-base transition-colors bg-white border border-gray-300 rounded colorInput-text isolate dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500"
        onChange={onChange}
        id={id + "Input"}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FileArea = (props) => {
  const { label, id, className, onChange, filetypes, style } = props;

  const [filename, setFilename] = useState("");
  const filetypeArray = filetypes.split(",");
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const filenameSplit = file.name.split(".");
    const filetype = filenameSplit[filenameSplit.length - 1];
    if (!filetypeArray.includes(filetype.toLowerCase())) {
      e.preventDefault();
      alert("Invalid file type! \nPlease upload a " + filetypeArray.join(", ") + " file.");
      return;
    }
    setFilename(file.name);
    onChange(file);
  };

  const handleClear = () => {
    clearInput();
    onChange(null);
  }

  const clearInput = () => {
    setFilename("");
    const input = document.getElementById(id + "Input");
    input.value = "";
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const filenameSplit = file.name.split(".");
    const filetype = filenameSplit[filenameSplit.length - 1];
    if (!filetypeArray.includes(filetype.toLowerCase())) {
      e.preventDefault();
      alert("Invalid file type! \nPlease upload a " + filetypeArray.join(", ") + " file.");
      return;
    }
    setFilename(file.name);
    onChange(file);
  }

  return (
    <div id={id + "Block"} className={"flex flex-col mx-0 my-1" + className} style={style}>
      <div className="mb-1 text-xs font-semibold transition-colors colorInput-label isolate text-neutral-800 dark:text-neutral-50">
        {label}
      </div>
      <div className="flex items-center transition-colors bg-white border border-gray-300 rounded justify-centertext-base h-9 colorInput-text dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          htmlFor={id + "Input"}
          className="flex items-center justify-center h-full cursor-pointer whitespace-nowrap"
          style={{ flex: "10" }}
        >
          {filename === "" ? (
            "Browse Image"
          ) : (
            <TruncateText text={filename} maxLength={10} keepExtension={true} />
          )}
        </label>
        <div
          className="flex items-center justify-center h-full"
          style={{ flex: "2" ,display: filename === "" ? "none" : "flex" }}
        >
          <XCircleFill
            className="transition-colors cursor-pointer hover:fill-red-400"
            onClick={handleClear}
          />
        </div>
        <input
          className="w-0 h-0"
          type="file"
          onChange={handleChange}
          id={id + "Input"}
        />
      </div>
    </div>
  );
};
