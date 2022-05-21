import React from "react";
import Modal from "../Global/Modal";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";
import useWindowSize from "@/hooks/useWindowResize";

const CurriculumModal = () => {
  const { graduatedCurriculum } = useGraduatedCurriculum();
  const size = useWindowSize();
  return (
    <Modal
      title="Mi currículum"
      buttonText="Ver mi currículum"
      buttonClass="btn btn-outline-primary"
      modalClass="modal-dialog modal-xl modal-dialog-scrollable"
      buttonCloseText="Cerrar"
      disabled={size.width < 700}
      disabledCause={"El navegador no soporta la visualización de PDF."}
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
