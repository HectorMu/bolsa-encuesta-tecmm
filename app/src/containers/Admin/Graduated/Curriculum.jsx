import { useState, useEffect, useCallback, useRef } from "react";

//hooks
import useForm from "@/hooks/useForm";
//components
import Modal from "@/components/Global/Modal";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import Loading from "@/components/Global/Loading";

//services
import Auth from "@/services/Auth";
import graduatesService from "@/services/Admin/graduates.service";

import toast from "react-hot-toast";

const Curriculum = ({ graduated, isLoading }) => {
  const closeModalRef = useRef();
  const { form, setForm, handleChange, reset } = useForm({
    email: "",
    description: "",
  });
  const [isLoadingCV, setIsLoadingCV] = useState(false);
  const [curriculum, setCurriculum] = useState("");

  const sendErrorEmailHandler = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Enviando correo...");
    const results = await graduatesService.notifyCheckCV(form);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success(results.statusText, { id: tLoading });
    closeModalRef.current.click();
    reset();
  };

  const getCurriculumHandler = useCallback(async () => {
    setIsLoadingCV(true);
    const fetchedCurriculum = await Auth.getResourcesFromPublicFolder(
      `/graduated/files/cvs/${graduated?.curriculum}`
    );

    setCurriculum(fetchedCurriculum);
    setIsLoadingCV(false);
  }, [graduated?.curriculum]);

  useEffect(() => {
    setForm({ ...form, ["email"]: graduated.correo });
  }, [form.description]);
  useEffect(() => {
    getCurriculumHandler();
  }, [getCurriculumHandler]);

  return isLoading ? null : (
    <ShowcaseContainer>
      <ShowcaseCard>
        <h3 className="text-center text-primary font-weight-bolder">
          Curriculum
        </h3>
        {isLoadingCV ? (
          <Loading />
        ) : (
          <div className="d-flex justify-content-center">
            {curriculum.length > 0 ? (
              <>
                <Modal
                  id="cvModal"
                  title={`${graduated.nombre_completo} CV`}
                  buttonText="Ver curriculum"
                  buttonClass="btn btn-outline-primary "
                  faIcon={<i className="fas fa-eye"></i>}
                  faIconPos="right"
                  modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                  buttonCloseText="Cerrar"
                >
                  <object
                    data={curriculum}
                    type="application/pdf"
                    frameBorder="0"
                    width="100%"
                    style={{ height: "100vh", width: "100%" }}
                  >
                    <div className="d-flex flex-column justify-content-center">
                      <p className="text-center">
                        El navegador no soporta la visualizacion de PDF.{" "}
                      </p>
                      <a className="btn btn-primary" href={curriculum} download>
                        Descargar PDF
                      </a>
                    </div>
                  </object>
                </Modal>
                <Modal
                  closeRef={closeModalRef}
                  id="adviseMistakeCVModal"
                  title={`Informar de error en curriculum`}
                  buttonText="Informar error"
                  buttonClass="btn btn-outline-primary mx-1 "
                  faIcon={<i className="fas fa-exclamation-circle"></i>}
                  faIconPos="right"
                  modalClass="modal-dialog modal-lg modal-dialog-centered"
                  buttonCloseText="Cerrar"
                >
                  <p>
                    Se enviara un correo eléctronico al egresado{" "}
                    <span className="text-primary font-weight-bold">
                      {graduated.nombre_completo}
                    </span>
                  </p>
                  <p>
                    Correo del egresado:{" "}
                    <span className="text-primary font-weight-bold">
                      {graduated.correo}
                    </span>
                  </p>
                  <form onSubmit={sendErrorEmailHandler}>
                    <textarea
                      className="form-control"
                      placeholder="Ingresa la descripción del error..."
                      rows="10"
                      name="description"
                      onChange={handleChange}
                      value={form.description}
                    ></textarea>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="submit"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Enviar <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </Modal>
              </>
            ) : (
              <h5 className="text-center w-100">
                {graduated.nombre_completo} aun no sube su curriculum
              </h5>
            )}
          </div>
        )}
      </ShowcaseCard>
    </ShowcaseContainer>
  );
};

export default Curriculum;
