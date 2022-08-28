import PageTableLayout from "@/components/Global/PageTableLayout";
import Dashboard from "@/containers/Admin/Dashboard/Dashboard";
const Index = () => {
  return (
    <PageTableLayout title="Dashboard" button={false}>
      <Dashboard />
    </PageTableLayout>
  );
};

export default Index;
