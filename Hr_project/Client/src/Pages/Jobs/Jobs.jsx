import React, { useState } from "react";
import JobDetailCard from "@/components/my_component/jobsCard/JobDetailCard";
import SearchBar from "@/components/my_component/searchBar/searchBar";
import TimeDate from "@/components/my_component/TimeDate/timedate";
import { Button } from "@/components/ui/button";
import JobCreationModal from "@/components/my_component/candidateStepper/Forms/JobCreationModal";
import { jobs } from "@/fakeData/jobData";

function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (id) => {
    console.log(`Editing job with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting job with id: ${id}`);
  };

  const handleCreate = (values) => {
    console.log("Creating job:", values);
    // Logic to handle job creation, such as updating the jobs state
    setIsModalVisible(false);
  };

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate displayed jobs based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage * itemsPerPage < filteredJobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold ml-4 mb-4">Jobs</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-grow"> {/* Allow this div to grow and take space */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="flex-none"> {/* Prevent this div from growing */}
          <TimeDate />
        </div>
        <Button variant="default" size="lg" onClick={() => setIsModalVisible(true)}>
          Create Job
        </Button>
      </div>
      <div className="flex justify-between mb-4 ml-6">
        <Button onClick={handlePrev} disabled={currentPage === 1}>Previous</Button>
        <Button onClick={handleNext} disabled={currentPage * itemsPerPage >= filteredJobs.length}>Next</Button>
      </div>
      <div className="grid ml-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {displayedJobs.map((job) => (
          <JobDetailCard
            key={job.id}
            job={job}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isSidebarCollapsed={false}
          />
        ))}
      </div>

      {/* Job Creation Modal */}
      <JobCreationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Jobs;
