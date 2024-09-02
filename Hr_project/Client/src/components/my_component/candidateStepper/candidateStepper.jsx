import React, { useState, useEffect } from "react";
import {
  FaFileUpload,
  FaClipboardCheck,
  FaUserCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { Modal, message } from "antd";
import { Button } from "@/components/ui/button";
import UploadResume from "../uploadResume/uploadResume";
import ResumeForm from "../resumeForm/resumeForm";
import QuizComponent from "../testComponent/testComponent";
import { quantum } from "ldrs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

quantum.register();

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isHRVerified, setIsHRVerified] = useState(false); // Track HR verification
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    email: "",
    skills: "",
    education: "",
    colleges: "",
  });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isTestLinkClicked, setIsTestLinkClicked] = useState(false);

  useEffect(() => {
    // Handle visibility change to show a toast notification
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        toast.warn(
          "You have switched tabs. The quiz is stopped. See you next time.",
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleResumeUpload = (file) => {
    setIsScanning(true);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:5000/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFormData(response.data);
        setIsModalOpen(true);
        setIsScanning(false);
        setResumeUploaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsScanning(false);
        message.error("Failed to upload resume. Please try again.");
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    if (formData.name && formData.contact_number && formData.email) {
      setIsModalOpen(false);
      message.info(
        "Thank you for applying! HR will review your resume and send you an email with the test link.",
      );
      simulateSendTestLink();
    }
  };

  // Simulate sending an email with a test link (normally done by HR)
  const simulateSendTestLink = () => {
    setTimeout(() => {
      // HR verification is simulated here
      setIsHRVerified(true);
      message.success(
        "HR has verified your resume. Please check your email for the test link.",
      );
    }, 9000); // Simulate delay for HR verification
  };

  // Simulate clicking the test link from the email
  const handleTestLinkClick = () => {
    setIsTestLinkClicked(true);
    setCurrentStep(1); // Move to the test step after clicking the test link
    message.success(
      "You have successfully accessed the test. You can now proceed.",
    );
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setCurrentStep(2);
  };

  const steps = [
    {
      name: "Upload Resume",
      icon: <FaFileUpload />,
      component: <UploadResume onResumeUpload={handleResumeUpload} />,
    },
    {
      name: "Test",
      icon: <FaClipboardCheck />,
      component: <QuizComponent onQuizComplete={handleQuizComplete} />,
    },
    {
      name: "Interview",
      icon: <FaUserCheck />,
      component: <div>Interview Component</div>,
    },
    {
      name: "Submission",
      icon: <FaCheckCircle />,
      component: <div>Submission Component</div>,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="m-20 flex flex-col items-center rounded-lg p-10 shadow-md">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex size-16 items-center justify-center rounded-full border-2 shadow-md ${
                index <= currentStep
                  ? "bg-[#1b0b75] text-2xl text-white"
                  : "border-purple-800 bg-white text-2xl text-[#1b0b75]"
              }`}
            >
              {step.icon}
            </div>
            <div
              className={`ml-4 text-2xl font-semibold ${
                index === currentStep ? "text-[#1b0b75]" : "text-white"
              }`}
            >
              {step.name}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 w-full">
        {isScanning ? (
          <div className="flex justify-center">
            <l-quantum size="148" speed="1.75" color="#1b0b75"></l-quantum>
          </div>
        ) : (
          steps[currentStep].component
        )}
      </div>

      <div className="mt-6 flex w-full justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0 || currentStep === 2}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            currentStep === steps.length - 1 ||
            (currentStep === 0 && !isTestLinkClicked) ||
            (currentStep === 1 && !quizCompleted)
          }
        >
          Next
        </Button>
      </div>

      <Modal
        title="Resume Details"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        <ResumeForm formData={formData} setFormData={setFormData} />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleFormSubmit}>Submit</Button>
        </div>
      </Modal>

      {/* Simulate a Test Link button (normally this would be in an email) */}
      {resumeUploaded && isHRVerified && !isTestLinkClicked && (
        <div className="mt-6">
          <Button onClick={handleTestLinkClick}>
            Simulate Test Link Click (from email)
          </Button>
        </div>
      )}

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default Stepper;
