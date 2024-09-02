import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ResumeForm = ({ formData, setFormData }) => {
  // Initialize the form with useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use the reset function to update the form's state
  } = useForm({
    defaultValues: formData,
  });

  // Update form values when formData changes
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  // Handle form submission
  const onSubmitHandler = (data) => {
    console.log("Submitted Data:", data);
    setFormData(data); // Update the formData state in the parent component
  };

  return (
    <form
      className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1b0b75]">
        Resume Details
      </h2>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-xs italic text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Contact Number:
        </label>
        <input
          type="text"
          {...register("contact_number", {
            required: "Contact number is required",
          })}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your contact number"
        />
        {errors.contact_number && (
          <p className="text-xs italic text-red-500">
            {errors.contact_number.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email:
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-xs italic text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Skills:
        </label>
        <input
          type="text"
          {...register("skills")}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your skills (comma-separated)"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Education:
        </label>
        <input
          type="text"
          {...register("education")}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your education"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Colleges:
        </label>
        <input
          type="text"
          {...register("colleges")}
          className="w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b0b75]"
          placeholder="Enter your colleges"
        />
      </div>
    </form>
  );
};

export default ResumeForm;
