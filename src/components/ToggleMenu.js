import { useState, useRef, useEffect } from "react";
import EditAndRemoveMenu from "./EditAndRemoveMenu";

const ToggleMenu = ({ id }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (open && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [open]);

  return (
    <div className="ToggleMenu">
      <button className={"menu_btn"} onClick={toggleOpen} ref={menuRef}>
        <img
          className={open ? "menu_img_clicked" : "menu_img"}
          src={process.env.PUBLIC_URL + `/assets/menu.png`}
          alt="menu"
        />
      </button>
      {open && <EditAndRemoveMenu id={id} />}
    </div>
  );
};

export default ToggleMenu;
