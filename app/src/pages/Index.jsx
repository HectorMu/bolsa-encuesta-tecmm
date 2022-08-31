import PageTableLayout from "@/components/Global/PageTableLayout";
import DashboardAdmin from "@/containers/Admin/Dashboard/Dashboard";
import useSession from "@/hooks/useSession";
const Index = () => {
  const { user } = useSession();
  return (
    <PageTableLayout title="Dashboard" button={false}>
      {user?.fk_rol === 1 && <DashboardAdmin />}
    </PageTableLayout>
  );
};

export default Index;
