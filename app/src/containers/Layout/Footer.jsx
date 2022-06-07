const Footer = ({ webSite = "Your Website", year = "2022", currentTheme }) => {
  return (
    <footer
      className={`sticky-footer ${
        currentTheme === "dark" ? "bg-dark text-white" : "bg-light"
      } `}
    >
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
