import { useState } from "react";
import List from "@/containers/Graduated/JobBank/List";
import Showcase from "@/containers/Graduated/JobBank/Showcase";

const JobBank = () => {
  const [selectedJob, setSelectedJob] = useState({});

  return (
    <div className="container-fluid mb-3">
      <div className="col-xl-10 mx-auto">
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                <div style={{ height: "65vh" }}>
                  <div style={{ overflowY: "scroll", height: "100%" }}>
                    <List selection={{ selectedJob, setSelectedJob }} />
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 col-xl-7">
                <Showcase selection={{ selectedJob, setSelectedJob }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBank;
