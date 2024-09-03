import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Settings = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [avatarPreview, setAvatarPreview] = useState(null); // State to hold avatar preview

  const onSubmit = (data) => {
    onSave(data);
  };

  // Function to trigger the file input click
  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click(); // Trigger click on hidden file input
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-1/2 mx-auto h-[70vh] space-y-6 rounded-lg shadow-md"
    style={{
      background: "linear-gradient(135deg, #4431AF, #6A4ED2)", // Use `background` instead of `backgroundColor`
    }}>
      <h1 className="mb-4 text-center text-2xl font-bold text-white">
        User Settings
      </h1>

      {/* Avatar Preview at the Top */}
      <div className="mb-4 flex justify-center">
        <div onClick={handleAvatarClick} className="cursor-pointer">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="h-24 w-24 rounded-full border-2 border-white"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-2 border-white flex items-center justify-center text-white">
              No Avatar
            </div>
          )}
        </div>
      </div>

      {/* Upload Avatar Field */}
      <input
        id="avatar-input" // Add an ID to the input
        type="file"
        accept="image/*"
        {...register("avatar", { required: "Avatar is required" })}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setValue("avatar", reader.result); // Set the base64 string as value
              setAvatarPreview(reader.result); // Set the avatar preview
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      {errors.avatar && (
        <span className="text-sm text-red-500">{errors.avatar.message}</span>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaUser className="ml-3 text-lg text-gray-800" />
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}

        {/* Email Field */}
        <motion.div
          className="flex items-center rounded-lg bg-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaEnvelope className="ml-3 text-lg text-gray-800" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`focus:border-light-purple-400 mt-1 block w-full border-0 bg-purple-100 p-3 transition focus:outline-none focus:ring-0 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
        </motion.div>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}

        <div className="flex justify-center mt-4">
          <Button
            variant = "outline"
            type="submit"
            size="lg"
            className="bg-purple-600 transition hover:bg-purple-700 hover:text-white"
          >
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
