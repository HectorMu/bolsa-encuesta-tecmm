import React from "react";

const Footer = ({ webSite = "Your Website", year = "2022" }) => {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>
            Copyright &copy; {webSite} {year}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
