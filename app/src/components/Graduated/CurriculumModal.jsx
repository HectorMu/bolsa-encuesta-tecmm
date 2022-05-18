import React from "react";
import Modal from "../Global/Modal";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";

const CurriculumModal = () => {
  const { graduatedCurriculum } = useGraduatedCurriculum();
  return (
    <Modal
      title="Mi curriculum"
      buttonText="Ver mi curriculum"
      buttonClass="btn btn-outline-primary"
      modalClass="modal-dialog modal-xl modal-dialog-scrollable"
      buttonCloseText="Cerrar"
      faIcon={<i className="fas fa-eye"></i>}
    >
      <object
        data={graduatedCurriculum}
        type="application/pdf"
        frameBorder="0"
        width="100%"
        style={{ height: "100vh", width: "100%" }}
      >
        <div className="d-flex flex-column justify-content-center">
          <p className="text-center">
            El navegador no soporta la visualizacion de PDF.{" "}
          </p>
          <a className="btn btn-primary" href={graduatedCurriculum} download>
            Descargar PDF
          </a>
        </div>
      </object>
    </Modal>
  );
};

export default CurriculumModal;
