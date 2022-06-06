import PageTableLayout from "@/components/Global/PageTableLayout";
import List from "@/containers/Admin/Companies/List";

const Companies = () => {
  return (
    <PageTableLayout
      to={"/companies/add"}
      title={"Empresas"}
      addButtonText={"Agregar empresa"}
    >
      <List />
    </PageTableLayout>
  );
};

export default Companies;
