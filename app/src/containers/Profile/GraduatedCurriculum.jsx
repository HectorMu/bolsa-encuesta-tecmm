import { useRef, useState, useEffect } from "react";
import profileService from "@/services/Graduated/profile.service";
import toast from "react-hot-toast";
import Loading from "@/components/Global/Loading";
import useSession from "@/hooks/useSession";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";

const GraduatedCurriculum = () => {
  const { graduatedCurriculum, loadingCurriculum, getCurriculumHandler } =
    useGraduatedCurriculum();

  const [cvFile, setCvFile] = useState(null);
  const uploadFileRef = useRef();
  const { verifySession } = useSession();

  const uploadCVHandler = async () => {
    if (cvFile === null) {
      uploadFileRef.current.click();
      return;
    }

    let formData = new FormData();
    formData.append("cv", cvFile);

    if (cvFile === null) return;

    const tLoading = toast.loading("Validando y subiendo...");
    const results = await verifySession(() =>
      profileService.uploadCurriculum(formData)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }

    toast.success("Curriculum subido, ¡ya puedes empezar a postularte!", {
      id: tLoading,
    });
    setCvFile(null);
    getCurriculumHandler();
  };

  return (
    <div className="col-md-12 col-lg-10 mx-auto">
      {graduatedCurriculum === "Pendiente" ? (
        <div className="d-flex mt-5 flex-column justify-content-center h-100 align-items-center">
          <h2 className="font-weight-bolder text-primary">
            Aun no tienes un currículum
          </h2>

          {cvFile !== null && (
            <div
              data-aos="flip-left"
              className="d-flex flex-column align-items-center justify-content-center card p-3 shadow border-0 "
            >
              <h5 className="curriculum-selected">
                Archivo seleccionado: {cvFile?.name}
              </h5>
              <button
                onClick={() => setCvFile(null)}
                className="btn btn-primary btn-sm"
              >
                Quitar <i className="fas fa-times"></i>
              </button>
            </div>
          )}
          <div className="form-group">
            <input
              ref={uploadFileRef}
              type={"file"}
              onChange={(e) => setCvFile(e.target.files[0])}
              hidden={true}
            />
          </div>
          <button
            onClick={uploadCVHandler}
            className="btn btn-primary btn-lg mt-3"
          >
            {cvFile === null ? "Seleccionar archivo" : "Subir mi currículum"}
          </button>
          <h4 className="mt-5 border-bottom text-black border-dark">
            El currículum lo necesitarás para postularte en la bolsa de trabajo
          </h4>
        </div>
      ) : (
        <div>
          <div className=" d-flex justify-content-end h-100 align-items-center">
            {cvFile !== null && (
              <p className="curriculum-selected mr-2 align-self-center">
                Archivo seleccionado:{" "}
                <span className="text-primary">{cvFile?.name}</span>
              </p>
            )}

            <button
              onClick={uploadCVHandler}
              className="btn btn-primary btn-sm mb-2"
            >
              {cvFile === null ? "Cambiar" : "Subir nuevo currículum"}
            </button>
            {cvFile !== null && (
              <button
                onClick={() => setCvFile(null)}
                className="btn btn-primary btn-sm mb-2 ml-2"
              >
                Quitar <i className="fas fa-times"></i>
              </button>
            )}
            <input
              ref={uploadFileRef}
              type={"file"}
              onChange={(e) => setCvFile(e.target.files[0])}
              hidden={true}
            />
          </div>

          <div className="card shadow-lg">
            <div className="card-body">
              <div className="form-group">
                <input
                  ref={uploadFileRef}
                  type={"file"}
                  onChange={(e) => setCvFile(e.target.files[0])}
                  hidden={true}
                />
              </div>

              {loadingCurriculum ? (
                <Loading />
              ) : (
                <object
                  data={graduatedCurriculum}
                  type="application/pdf"
                  frameBorder="0"
                  width="100%"
                  style={{ height: "100vh", width: "100%" }}
                >
                  <div className="d-flex flex-column justify-content-center">
                    <p className="text-center">
                      El navegador no soporta la visualización de PDF.{" "}
                    </p>
                    <a
                      className="btn btn-primary"
                      href={graduatedCurriculum}
                      download
                    >
                      Descargar PDF
                    </a>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraduatedCurriculum;
