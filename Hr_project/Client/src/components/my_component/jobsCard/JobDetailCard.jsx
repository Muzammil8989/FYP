import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button"; // Ensure Button is imported correctly
import JobEditModal from "@/components/my_component/candidateStepper/Forms/JobEditModal";

const JobDetailCard = ({ job, handleEdit, handleDelete, isSidebarCollapsed }) => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={`mb-4 flex h-[250px] flex-col justify-between rounded-lg p-2 shadow-md`}
        style={{
          width: isSidebarCollapsed ? "100%" : "500px",
          background: "linear-gradient(135deg, #4431AF, #6A4ED2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}  
        whileTap={{ scale: 0.98 }}    
      >
        <div className="mb-2 flex flex-col items-center justify-center">
          <img
            src={job.logo}
            alt="company logo"
            className="size-10 rounded-full" // Adjusted logo size
          />
          <div className="mt-2 text-center">
            <h3 className="text-lg font-semibold text-white">{job.title}</h3> {/* Reduced font size */}
            <p className="text-xs font-medium text-gray-300">{job.company}</p> {/* Reduced font size */}
            <p className="text-xs font-medium text-gray-300">{job.location}</p> {/* Reduced font size */}
            <p className="text-xs font-medium text-gray-300">${job.salary}</p> {/* Reduced font size */}
            <p className="mt-1 text-xs text-gray-200">{job.description}</p> {/* Reduced font size */}
          </div>
        </div>
        <div className="mb-2 flex items-center justify-center text-white">
          <FiUsers className="mr-1" />
          <p className="text-md font-medium">{job.applicants} Applicants</p> {/* Adjusted font size */}
        </div>
        <div className="-mt-1 flex justify-between">
          <Button
            onClick={openModal} 
            variant="outline"
            className="animate-slide-up flex items-center text-xs" // Reduced text size for button
          >
            <FiEdit className="mr-1" /> Edit
          </Button>
          <Button
            onClick={() => handleDelete(job.id)}
            variant="outline"
            className="animate-slide-up flex items-center text-xs" // Reduced text size for button
          >
            <FiTrash2 className="mr-1" /> Delete
          </Button>
        </div>
      </motion.div>

      <JobEditModal 
        visible={isModalOpen} 
        onClose={closeModal} 
        job={job} 
        onEdit={handleEdit} 
      />
    </>
  );
};

export default JobDetailCard;
