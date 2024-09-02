import React, { useState } from "react";
import Navbar from "@/components/my_component/Navbar/Navbar";
import CandidateStepper from "@/components/my_component/candidateStepper/candidateStepper";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Candidate() {
  const [currentStep, setCurrentStep] = useState(0);



  return (
    <div className="h-screen">
      <div className="p-4">
        <Navbar />
      </div>
      <div className="p-8">
        <CandidateStepper currentStep={currentStep} />

        
      </div>
    </div>
  );
}

export default Candidate;
