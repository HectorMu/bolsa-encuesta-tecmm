import Modal from "../Global/Modal";

const SpecialitiesModal = ({ career }) => {
  console.log(career);
  return (
    <Modal
      buttonText="Si no conoces la especialidad da click aquí"
      buttonClass="btn btn-link text-primary"
      modalClass="modal-lg modal-dialog"
    >
      <div className="d-flex justify-content-center text-black text-center flex-column">
        <h3>Según la carrera: {career}</h3>
        <h4>
          <span>La especialidad es:</span>{" "}
          <span className="text-primary font-weight-bold">XD</span>
        </h4>
      </div>
    </Modal>
  );
};

export default SpecialitiesModal;
