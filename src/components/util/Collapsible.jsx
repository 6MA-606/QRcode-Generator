import { useState } from "react";
import { Dash, Plus } from "react-bootstrap-icons";

export const Collapsible = (props) => {
  const { label, id, className, containerClassName, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={"flex flex-col mx-0 my-1 " + className}>
      <div
        className={"flex items-center transition-colors bg-white border border-gray-300 rounded cursor-pointer justify-centertext-base h-9 colorInput-text dark:bg-neutral-600 dark:text-neutral-200 dark:border-neutral-500" + 
        (isOpen ? " rounded-b-none" : "")}
        onClick={handleToggle}
      >
        <div
          className="flex items-center w-full h-full ml-2"
          style={{ flex: "10" }}
        >
          {label}
        </div>
        <div
          className="flex items-center justify-center h-full"
          style={{ flex: "2" }}
        >
          {isOpen ? (
            <Dash className="transition-colors" />
          ) : (
            <Plus
              className="transition-colors"
              // onClick={handleClear}
            />
          )}
        </div>
      </div>
      <div
        id={id + "Collapsible"}
        className={
          "flex transition-all rounded-t-none overflow-hidden justify-center items-center mb-1 text-base bg-gray-100 border border-gray-300 border-t-0 rounded colorInput-text isolate dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-500" +
          (isOpen ? "" : " border-0")
        }
        style={{ height: isOpen ? (document.getElementById(id + "Collapsible").firstChild.scrollHeight + 10) + "px" : "0px" }}
      >
        <div className={"flex flex-col w-11/12 h-auto " + containerClassName}>{children}</div>
      </div>
    </div>
  );
};
