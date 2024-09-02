import React from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const UploadResume = ({ onResumeUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onResumeUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-400 rounded-lg  bg-gray-50 hover:bg-gray-100 transition duration-300">
      <div className="flex flex-col items-center mb-4">
        <FaFileUpload className="text-4xl font-bold text-[#4431af] animate-bounce mb-2" />
        <Label htmlFor="resume" className="text-xl font-semibold text-gray-700">Upload Resume</Label>
      </div>
      <Input
        type="file"
        id="resume"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden " 
      />
      <label
        htmlFor="resume"
        className="cursor-pointer  text-xl font-semibold  px-8 py-4 bg-[#4431af] text-white rounded-md transition-transform duration-300 transform hover:scale-105"
      >
        Choose File
      </label>
    </div>
  );
};

export default UploadResume;
