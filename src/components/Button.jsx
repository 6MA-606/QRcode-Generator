import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export const CornerButton = (props) => {
  const { icon, url, bg } = props;

  return (
    <div
      className="fixed top-0 right-0 w-20 h-20 flex justify-center items-center"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        background: bg,
      }}
    >
      <div
        className="translate-x-1/2 -translate-y-1/2 cursor-pointer transition hover:scale-110 active:scale-100"
        onClick={() => { window.open(url, "_blank") }}
      >
        {icon}
      </div>
    </div>
  );
};

export const DarkmodeButton = (props) => {
  const { darkmode, isActivated, handleDarkmodeChange } = props;

  const [icon, setIcon] = useState(<MoonFill size={30} />);

  const toggleMode = () => {
    const allElement = document.querySelectorAll("*");
    allElement.forEach((element) => {
      element.style.transition = "all .35s ease";
    });
    darkmode.toggle();
    if (darkmode.isActivated()) {
      handleDarkmodeChange(true);
      setIcon(<SunFill size={30} color="ghostwhite" />);
      localStorage.setItem("darkmode", "true");
    } else {
      handleDarkmodeChange(false);
      setIcon(<MoonFill size={30} />);
      localStorage.setItem("darkmode", "false");
    }
  };

  useEffect(() => {
    if (isActivated) {
      setIcon(<SunFill size={30} color="ghostwhite" />);
    } else {
      setIcon(<MoonFill size={30} />);
    }
  }, [isActivated]);

  return (
    <div onClick={toggleMode} className="cursor-pointer">
      {icon}
    </div>
  );
};
