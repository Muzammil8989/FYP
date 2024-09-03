import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "antd";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileUpload,
} from "react-icons/fa";
import { motion } from "framer-motion";

const JobEditModal = ({ visible, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onCreate(data);
  };

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
    >
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
      Update Job Post
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg bg-purple-50 p-4 shadow-md"
      >
        {/* Job Title Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaBriefcase className="ml-3 text-lg text-gray-800" />
          <input
            type="text"
            placeholder="Job Title"
            {...register("title", { required: "Job title is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.title && (
          <span className="text-sm text-red-500">{errors.title.message}</span>
        )}

        {/* Company Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaBuilding className="ml-3 text-lg text-gray-800" />
          <input
            type="text"
            placeholder="Company"
            {...register("company", { required: "Company name is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.company ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.company && (
          <span className="text-sm text-red-500">{errors.company.message}</span>
        )}

        {/* Location Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaMapMarkerAlt className="ml-3 text-lg text-gray-800" />
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.location ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.location && (
          <span className="text-sm text-red-500">
            {errors.location.message}
          </span>
        )}

        {/* Salary Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaMoneyBillWave className="ml-3 text-lg text-gray-800" />
          <input
            type="number"
            placeholder="Salary"
            {...register("salary", { required: "Salary is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.salary ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.salary && (
          <span className="text-sm text-red-500">{errors.salary.message}</span>
        )}

        {/* Upload Logo Field */}
        <motion.div
          className="flex h-20 items-center justify-center rounded-lg bg-purple-100" // Add justify-center
          whileHover={{ scale: 1.02 }}
        >
          <FaFileUpload className="mr-2 text-lg text-gray-800 animate-bounce" />{" "}
          {/* Move icon to the left of the label */}
          <label className="cursor-pointer text-center">
            <span className="text-gray-600 text-lg font-semibold">Upload Logo</span>
            <input
              type="file"
              accept="image/*"
              {...register("logo", { required: "Logo is required" })}
              className="hidden"
              onChange={(e) => {
                console.log(e.target.files[0]);
              }}
            />
          </label>
        </motion.div>
        {errors.logo && (
          <span className="text-sm text-red-500">{errors.logo.message}</span>
        )}

        {/* Job Description Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <textarea
            placeholder="Job Description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-1 block h-24 bg-purple-100 w-full resize-none border-0 p-3 focus:outline-none focus:ring-0 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.description && (
          <span className="text-sm text-red-500">
            {errors.description.message}
          </span>
        )}

        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-purple-600 transition hover:bg-purple-700"
          >
            Update Job
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JobEditModal;

