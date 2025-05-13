import React from "react";
import "./JobsPage.css";
import Header from "../Header/Header";
import JobPost from "../../Components/Jobs";

export default function JobsPage() {
  return (
    <div className="homepage">
      <Header />
      <JobPost
        rank={1}
        title="Manufactured Consensus on X.com"
        domain="rook2root.co"
        time="2 hours"
      />
      <JobPost
        rank={1}
        title="Manufactured Consensus on X.com"
        domain="rook2root.co"
        time="2 hours"
      />
      <JobPost
        rank={1}
        title="Manufactured Consensus on X.com"
        domain="rook2root.co"
        time="2 hours"
      />
    </div>
  );
}
