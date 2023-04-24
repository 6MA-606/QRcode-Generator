import { Github, MoonFill, SunFill } from "react-bootstrap-icons";
import corner from "./_cornerButton.module.scss";
import dm_styles from "./_darkmodeButton.module.scss";
import { useState } from "react";

export const CornerButton = (props) => {
  const { text } = props;

  return (
    <div className={corner.btn}>
      <div>
        <Github size={30} />
      </div>
    </div>
  );
};

export const DarkmodeButton = (props) => {
    const { darkmode } = props;
    
    const [icon, setIcon] = useState(<MoonFill size={30} />);

    const toggleMode = () => {
        darkmode.toggle()
        if (darkmode.isActivated()) {
            setIcon(<SunFill size={30} color="ghostwhite" />)
            localStorage.setItem("darkmode", true)
        } else {
            setIcon(<MoonFill size={30} />)
            localStorage.setItem("darkmode", true)
        }
    }

    return (
        <div onClick={toggleMode} className={dm_styles.btn}>
            {icon}
        </div>
    );
}
