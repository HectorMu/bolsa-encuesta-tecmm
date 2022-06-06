import List from "@/containers/Admin/JobBank/Jobs/List";
import PageTableLayout from "@/components/Global/PageTableLayout";

const Jobs = () => {
  return (
    <PageTableLayout title={"Todos los trabajos"} button={false}>
      <List />
    </PageTableLayout>
  );
};

export default Jobs;
