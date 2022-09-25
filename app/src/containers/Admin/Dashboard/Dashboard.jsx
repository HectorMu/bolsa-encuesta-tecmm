import LastCompaniesAnswers from "./LastCompaniesAnswers";
import LastGraduatesAnswers from "./LastGraduatesAnswers";
import LatestJobs from "./LatestJobs";
import MetricCard from "./MetricCard";
import RecentUsers from "./RecentUsers";

const Dashboard = () => {
  return (
    <>
      <div className="row dashboard-row mx-auto">
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-3">
          <MetricCard
            service={"GetAccountsCount"}
            icon="fas fa-users"
            title={"Cuentas"}
            to="/accounts"
          />
        </div>
        <div className="col-12  col-md-6 col-lg-6 col-xl-3  mb-3">
          <MetricCard
            service={"GetCompaniesCount"}
            icon="fas fa-building"
            title={"Empresas"}
            to="/companies"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3  mb-3">
          <MetricCard
            service={"GetGraduatesCount"}
            icon="fas fa-user-graduate"
            title={"Egresados"}
            to="/graduates"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3  mb-3">
          <MetricCard
            service={"GetJobsCount"}
            icon="fas fa-briefcase"
            title={"Trabajos"}
            to="/jobbank"
          />
        </div>
      </div>
      <h1 className="h3 mb-0 text-gray-800 mt-3 border-bottom mb-4 border-bottom-purple">
        Actividad
      </h1>
      <div className="row ">
        <div className="col-12 col-xl-6 mb-3">
          <RecentUsers />
        </div>
        <div className="col-12 col-xl-6 mb-3">
          <LastGraduatesAnswers />
        </div>
        <div className="col-12 col-xl-6 mb-3">
          <LastCompaniesAnswers />
        </div>
        <div className="col-12 col-xl-6 mb-3">
          <LatestJobs />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
