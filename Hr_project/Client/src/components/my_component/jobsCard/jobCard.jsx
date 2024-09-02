// JobCard.js
import React from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const JobCard = ({ job, showModal, isSidebarCollapsed }) => {
  return (
    <motion.div
      className={`mb-8 flex flex-col justify-between rounded-lg p-4 shadow-md`}
      style={{
        width: isSidebarCollapsed ? "100%" : "270px",
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
        </div>
      </div>
      <div className="mb-2 flex items-center justify-center text-white">
        <FiUsers className="mr-2" />
        <p className="text-lg font-medium">{job.applicants} Applicants</p>
      </div>
      <Button
        onClick={() => showModal(`Details for ${job.title} at ${job.company}`)}
        variant="outline"
        className="animate-slide-up w-full"
      >
        View Details
      </Button>
    </motion.div>
  );
};

export default JobCard;
