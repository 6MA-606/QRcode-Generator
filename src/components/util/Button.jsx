import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export const Button = (props) => {
  const { label, id, className, onClick, style, disabled } = props;

  return (
    <button
      className={"px-4 py-2 mx-1 text-base font-semibold text-white no-underline transition rounded-lg cursor-pointer submitBtn isolate" + " " + className}
      id={id}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const CornerButton = (props) => {
  const { icon, url, bg } = props;

  return (
    <div
      className="fixed top-0 right-0 flex items-center justify-center w-20 h-20"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        background: bg,
      }}
    >
      <div
        className="transition translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 active:scale-100"
        onClick={() => { window.open(url, "_blank") }}
      >
        {icon}
      </div>
    </div>
  );
};

export const DarkmodeButton = (props) => {
  const {state, setState} = props;

  const [icon, setIcon] = useState(<MoonFill size={30} />);

  const toggleMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      setIcon(<MoonFill size={30} />);
      setState(false);
      localStorage.theme = 'light';
      document.documentElement.classList.remove("dark");
    } else {
      setIcon(<SunFill size={30} color="ghostwhite" />);
      setState(true);
      localStorage.theme = 'dark';
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    if (state) {
      setIcon(<SunFill size={30} color="ghostwhite" />);
    } else {
      setIcon(<MoonFill size={30} />);
    }
  }, [state]);

  return (
    <div onClick={toggleMode} className="cursor-pointer">
      {icon}
    </div>
  );
};
