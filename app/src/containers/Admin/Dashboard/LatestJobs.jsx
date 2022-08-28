import React from "react";
import dashboardService from "@/services/Admin/dashboard.service";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import DataTable from "@/components/Global/DataTable";
import useRouterHooks from "@/hooks/useRouterHooks";
import Loading from "@/components/Global/Loading";

const LatestJobs = () => {
  const { navigate } = useRouterHooks();
  const { hookData, refreshData, isLoading } = useServiceFetchV2(
    dashboardService.GetLatestJobs,
    []
  );

  const redirectToDetailsPage = (job) =>
    navigate(`/jobbank/postulations/${job.id}/`);

  return (
    <>
      <h4 className="mb-3 ">Trabajos publicados recientemente</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <div
          style={{ overflowY: "scroll", height: "500px" }}
          className="purple-scroll"
        >
          <DataTable
            data={hookData}
            withHeader={false}
            refreshCallback={refreshData}
            emptyDataText={"Sin registros"}
            actionElement={{
              element: "id",
              className: "btn btn-link text-purple font-weight-bolder",
              action: (o) => redirectToDetailsPage(o),
            }}
          />
        </div>
      )}
    </>
  );
};

export default LatestJobs;
