import PageTableLayout from "@/components/Global/PageTableLayout";
import List from "@/containers/Admin/Graduated/List";

const Graduated = () => {
  return (
    <PageTableLayout
      to={"/graduates/add"}
      title={"Egresados"}
      addButtonText={"Agregar egresado"}
    >
      <List />
    </PageTableLayout>
  );
};

export default Graduated;
