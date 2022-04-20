import { useRef, useState, useEffect } from "react";
import profileService from "@/services/Graduated/profile.service";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";
import Loading from "@/components/Global/Loading";
import useSession from "@/hooks/useSession";

const GraduatedCurriculum = () => {
  const [cvName, setCVName] = useState("");
  const [curriculumPath, setCurriculumPath] = useState("");

  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const uploadFileRef = useRef();
  const { verifySession } = useSession();

  const getCurriculumHandler = async () => {
    setLoadingCurriculum(true);
    const fetchedCurriculum = await profileService.getCurriculum();
    setCVName(fetchedCurriculum);

    if (fetchedCurriculum === "Pendiente") return;
    const CVPath = await Auth.getResourcesFromPublicFolder(
      `graduated/cvs/${fetchedCurriculum}`
    );
    setCurriculumPath(CVPath);
    setLoadingCurriculum(false);
  };

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

  useEffect(() => {
    getCurriculumHandler();
  }, []);
  return (
    <div className="col-md-12 col-lg-10 mx-auto">
      {cvName === "Pendiente" ? (
        <div className="d-flex mt-5 flex-column justify-content-center h-100 align-items-center">
          <h2 className="font-weight-bolder text-primary">
            Aun no tienes un curriculum
          </h2>

          {cvFile !== null && (
            <div
              data-aos="flip-left"
              className="d-flex flex-column align-items-center justify-content-center card p-3 shadow border-0 "
            >
              <h5>Archivo seleccionado: {cvFile?.name}</h5>
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
            {cvFile === null ? "Seleccionar archivo" : "Subir mi curriculum"}
          </button>
          <h4 className="mt-5 border-bottom text-black border-dark">
            El curriculum lo necesitaras para postularte en la bolsa de trabajo
          </h4>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-end h-100 align-items-center">
            {cvFile !== null && (
              <p className="mr-2 align-self-center">
                Archivo seleccionado:{" "}
                <span className="text-primary">{cvFile?.name}</span>
              </p>
            )}

            <button
              onClick={uploadCVHandler}
              className="btn btn-primary btn-sm mb-2"
            >
              {cvFile === null ? "Cambiar" : "Subir nuevo curriculum"}
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
                <embed
                  src={curriculumPath}
                  frameBorder="0"
                  width="100%"
                  style={{ height: "100vh", width: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraduatedCurriculum;
