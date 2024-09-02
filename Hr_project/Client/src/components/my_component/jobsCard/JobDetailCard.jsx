import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const JobDetailCard = ({
  job,
  handleEdit,
  handleDelete,
  isSidebarCollapsed,
}) => {
  return (
    <motion.div
      className={`mb-6 flex h-[310px] flex-col justify-between rounded-lg p-2 shadow-md`}
      style={{
        width: isSidebarCollapsed ? "100%" : "500px",
        background: "linear-gradient(135deg, #4431AF, #6A4ED2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mb-4 flex flex-col items-center justify-center">
        <img
          src={job.logo}
          alt="company logo"
          className="size-16 rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
          <p className="text-sm font-medium text-gray-300">{job.company}</p>
          <p className="text-sm font-medium text-gray-300">{job.location}</p>
          <p className="text-sm font-medium text-gray-300">${job.salary}</p>
          <p className="mt-2 text-sm text-gray-200">{job.description}</p>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-center text-white">
        <FiUsers className="mr-2" />
        <p className="text-lg font-medium">{job.applicants} Applicants</p>
      </div>
      <div className="-mt-1 flex justify-between">
        <Button
          onClick={() => handleEdit(job.id)} // Pass job id for editing
          variant="outline"
          className="animate-slide-up flex items-center"
        >
          <FiEdit className="mr-2" /> Edit
        </Button>
        <Button
          onClick={() => handleDelete(job.id)} // Pass job id for deletion
          variant="outline"
          className="animate-slide-up flex items-center"
        >
          <FiTrash2 className="mr-2" /> Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default JobDetailCard;
