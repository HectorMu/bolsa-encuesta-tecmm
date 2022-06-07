import CompanyReport from "@/containers/Admin/SurveyReports/Company/Report";
import GraduatedReport from "@/containers/Admin/SurveyReports/Graduated/Report";
import PageTableLayout from "@/components/Global/PageTableLayout";

const CompanySurveys = () => {
  return (
    <PageTableLayout
      title="Reporte de encuestas de egresados y empresas"
      button={false}
    >
      <div className="row text-center mt-5 text-black">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3 mb-lg-0 mb-md-0 mb-xl-0">
          <div className="card shadow h-100">
            <div className="card-body ">
              <h4 className="mb-3">Reporte de empresas</h4>
              <CompanyReport />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="mb-3">Reporte de egresados</h4>
              <GraduatedReport />
            </div>
          </div>
        </div>
      </div>
    </PageTableLayout>
  );
};

export default CompanySurveys;
