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
            <div className="row vh-100">
              <div style={{ overflowY: "scroll" }} className="col-xl-4 h-75">
                <List selection={{ selectedJob, setSelectedJob }} />
              </div>
              <div className="col-xl-8">
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
