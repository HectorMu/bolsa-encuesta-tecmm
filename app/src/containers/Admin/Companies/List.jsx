import { useState } from "react";

//importando componentes personalizados
import DataTable from "../../../components/Global/DataTable";
import Loading from "../../../components/Global/Loading";

//importando hooks
import useServiceFetch from "../../../hooks/useServiceFetch";

//importando servicios
import company from "../../../services/company";

const List = () => {
  const [companies, setCompanies] = useState([]);

  const { isLoading } = useServiceFetch(company.List, setCompanies);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          title="Registros"
          data={companies}
          emptyDataText="Sin registros"
          renameHeaders={{
            nombre_comercial: "Nombre",
            n_empresa: "#",
            cp: "C.P",
            telefono: "Teléfono",
            tipo_empresa: "Tipo",
            actividad_economica: "Act. Enonomica",
          }}
          hideColumns={["creadoEn", "actualizadoEn"]}
        />
      )}
    </div>
  );
};

export default List;
