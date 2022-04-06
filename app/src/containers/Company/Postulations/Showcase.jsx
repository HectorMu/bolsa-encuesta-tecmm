import React from "react";
import Modal from "@/components/Global/Modal";

const ShowCase = ({ selection, setSelection }) => {
  console.log(selection);

  if (!selection.id) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h4 className="font-weight-bolder text-primary">
          Selecciona un elemento de la izquierda
        </h4>
      </div>
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-between p-2 border-light border shadow align-items-center ">
        <h6>
          Estado: <span className="text-primary">{selection.status}</span>{" "}
        </h6>
        <button className="btn btn-primary btn-sm rounded-pill">
          <i className="fas fa-check "></i> Marcar revisado
        </button>
      </div>

      <div className="d-flex   justify-content-center mt-5">
        <Modal
          title="Curriculum"
          buttonText="Ver curriculum"
          buttonClass="btn btn-primary btn-lg mt-3"
          modalClass="modal-dialog modal-xl modal-dialog-scrollable"
          buttonCloseText="Cerrar"
        >
          <embed
            src={`http://localhost:4000/graduated/cvs/${selection.curriculum}`}
            frameBorder="0"
            width="100%"
            style={{ height: "100vh", width: "100%" }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ShowCase;
