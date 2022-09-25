import DashboardCard from "@/components/Global/DashboardCard";
import dashboardService from "@/services/Admin/dashboard.service";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const MetricCard = ({ service, icon, title, to = "/" }) => {
  const { verifySession } = useSession();

  const {
    hookData: result,
    refreshData,
    isLoading,
    error,
  } = useServiceFetchV2(
    () => verifySession(dashboardService[service], refreshData),
    []
  );

  if (error.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }

  return (
    <div>
      <DashboardCard
        isLoading={isLoading}
        to={to}
        icon={icon}
        metric={result.count}
        title={title}
      />
    </div>
  );
};

export default MetricCard;
