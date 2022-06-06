import List from "@/containers/Admin/Accounts/List";
import PageTableLayout from "@/components/Global/PageTableLayout";

const Users = () => {
  return (
    <PageTableLayout
      to={"/accounts/add"}
      title={"Cuentas"}
      addButtonText={"Agregar cuenta"}
    >
      <List />
    </PageTableLayout>
  );
};

export default Users;
