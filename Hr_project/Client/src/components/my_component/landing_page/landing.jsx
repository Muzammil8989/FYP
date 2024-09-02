import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import VectorImage from "../../../assets/Images/VectorImage.svg";
import Logo from "../../../assets/Images/Logo.jpg";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import "animate.css";

import "./landing.css";

function Landing() {
  return (
    <>
      <div className="absolute left-6 top-6 z-50">
        <LazyLoad>
          <img
            src={Logo}
            alt="HR Image"
            className="z-10 size-10 rounded-[25%]"
          />
        </LazyLoad>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Initial state when component mounts
        animate={{ opacity: 1, scale: 1 }} // Animation to apply
        transition={{ duration: 0.5 }} // Animation duration
        className="flex min-h-screen items-center justify-center p-10"
      >
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="bg-gradient-blur bg-gradient"></div>
          {/* Left side */}
          <div className="text-top w-full p-4 md:order-1">
            <h1 className="heading-responsive text-primary-color mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Revolutionize Recruitment with AI
            </h1>
            {/* Apply Typewriter to the introductory paragraph */}
            <p className="text-responsive text-tertiary-color mb-8 text-lg md:text-xl">
              <Typewriter
                words={[
                  "Unlock the power of artificial intelligence to streamline your recruitment process. Let AI analyze resumes, screen candidates, and predict the best fits for your organization, saving you time and resources while ensuring top talent acquisition.",
                ]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={100}
              />
            </p>
            <div className="animate__animated animate__tada flex justify-center sm:flex sm:justify-start">
              {/* Use Link to navigate to HR and Candidate pages */}
              <Link to="/SignUp">
                <Button
                  variant="default"
                  size="lg"
                  className="m-2 px-4 py-6 text-xl"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          {/* Right side */}
          <div className="-z-0 flex w-full items-center justify-center p-4 md:order-2 md:w-1/2">
            {/* Lazy load the image */}
            <LazyLoad height={200}>
              <motion.img
                className="img-responsive md:mr-4"
                src={VectorImage}
                alt="HR Image"
              />
            </LazyLoad>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Landing;
