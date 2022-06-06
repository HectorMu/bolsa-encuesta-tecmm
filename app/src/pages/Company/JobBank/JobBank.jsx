import { Link } from "react-router-dom";
import List from "@/containers/Company/JobBank/List";
import PageTableLayout from "@/components/Global/PageTableLayout";

const JobBank = () => {
  return (
    <PageTableLayout
      title={"Mis vacantes"}
      addButtonText={"Crear vacante"}
      to={"/company/jobbank/add"}
    >
      <List />
    </PageTableLayout>
  );
};

export default JobBank;
