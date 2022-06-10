import Swal from "sweetalert2";

const HelpAlert = ({
  title = "Example title",
  text = "Example text",
  buttonText = "Help",
}) => {
  const toggleAlert = () => Swal.fire(title, text, "question");
  return (
    <button onClick={toggleAlert} className="btn btn-link text-primary btn-sm">
      {buttonText}
    </button>
  );
};

export default HelpAlert;
