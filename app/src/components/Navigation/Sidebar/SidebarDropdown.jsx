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
      <a
        className="nav-link collapsed"
        style={{ cursor: "pointer" }}
        data-toggle="collapse"
        data-target={`#collapse${SectionName.replace(" ", "-")}${title.replace(
          " ",
          "-"
        )}`}
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i className={icon + " text-muted"}></i>
        <span>{title}</span>
      </a>
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
