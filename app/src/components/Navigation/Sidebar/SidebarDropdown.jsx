import React from "react";
import { useContext } from "react";
import { SectionContext } from "./Section";

const SidebarDropdown = ({
  title = "New option",
  icon = "fas fa-question",
  children,
}) => {
  const { SectionName } = useContext(SectionContext);

  return (
    <li className="nav-item">
      <button
        className="btn nav-link collapsed"
        data-toggle="collapse"
        data-target={`#collapse${SectionName.replace(" ", "-")}${title.replace(
          " ",
          "-"
        )}`}
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i className={icon}></i>
        <span>{title}</span>
      </button>
      <div
        id={`collapse${SectionName.replace(" ", "-")}${title.replace(
          " ",
          "-"
        )}`}
        className="collapse"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">{children}</div>
      </div>
    </li>
  );
};

export default SidebarDropdown;
