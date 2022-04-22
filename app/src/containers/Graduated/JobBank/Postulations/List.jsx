//Implementando hooks
import Loading from "@/components/Global/Loading";
import JobCard from "@/components/Graduated/Postulations/JobCard";

const List = ({ searchTerm, postulations, isLoading }) => {
  return (
    <div>
      {!postulations.filter((job) =>
        job.vacante.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > 0 &&
        searchTerm.length > 0 && (
          <h5 className="text-center text-primary">
            No se encontraron resultados para: '{searchTerm}''
          </h5>
        )}

      {isLoading ? (
        <Loading />
      ) : postulations.length > 0 ? (
        postulations
          .filter((postulation) =>
            postulation.vacante.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((job) => <JobCard job={job} />)
      ) : (
        <h5 className="text-center">
          Aqui aparecerán los trabajos en los que te has postulado.
        </h5>
      )}
    </div>
  );
};

export default List;
