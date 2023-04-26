import { MoonFill, SunFill } from "react-bootstrap-icons";
import corner from "./_cornerButton.module.scss";
import dm_styles from "./_darkmodeButton.module.scss";
import { useEffect, useState } from "react";

export const CornerButton = (props) => {
  const { icon, url } = props;

  return (
    <div className={corner.btn}>
      <div onClick={() => { window.open(url, "_blank") }}>
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
    <div onClick={toggleMode} className={dm_styles.btn}>
      {icon}
    </div>
  );
};
