import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material"; // Import Material-UI Circular Progress
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2"; // Import SweetAlert2

const QuizComponent = ({ onQuizComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer

  // Sample question and answers
  const question = "What is the capital of France?";
  const answers = [
    { id: 1, text: "Berlin" },
    { id: 2, text: "Madrid" },
    { id: 3, text: "Paris" },
    { id: 4, text: "Rome" },
  ];

  useEffect(() => {
    let timer;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear the timer and stop the quiz
        clearInterval(timer);
        Swal.fire({
          title: "Quiz Stopped",
          text: "You have switched tabs. The quiz is stopped. See you next time.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to the homepage
          window.location.href = "http://localhost:5173/";
        });
      }
    };

    if (timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit(); // Automatically submit when time runs out
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [timeLeft, isSubmitted]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedAnswer === 3) {
      // Assuming answer 3 (Paris) is correct
      console.log("Correct answer!");
    } else {
      console.log("Wrong answer!");
    }
    onQuizComplete(); // Call the prop function to signal quiz completion
  };

  return (
    <div className="relative mx-auto h-[450px] w-[500px] rounded-lg border p-5 shadow-md">
      {/* Timer centered above the question */}
      <div className="mb-4 flex flex-col items-center">
        <CircularProgress
          variant="determinate"
          value={(timeLeft / 60) * 100}
          size={80}
          sx={{
            color: timeLeft > 10 ? "#1b0b75" : "#ff1744",
          }}
        />
        <div className="mt-1 text-center text-sm">{timeLeft} seconds left</div>
      </div>

      <h2 className="mb-4 text-center text-xl font-semibold">{question}</h2>

      <div className="mt-10 grid grid-cols-2 gap-4">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`flex cursor-pointer items-center justify-center rounded-lg border p-4 text-center transition-colors duration-200 ${isSubmitted ? "cursor-not-allowed bg-gray-300" : "hover:bg-[#1b0b75] hover:text-white"} ${selectedAnswer === answer.id ? "bg-[#1b0b75] text-white" : ""}`}
            onClick={() => {
              if (!isSubmitted) setSelectedAnswer(answer.id);
            }}
          >
            {answer.text}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className={`mt-4 w-full rounded p-2 text-white ${isSubmitted ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={isSubmitted || selectedAnswer === null} // Disable button if already submitted or no answer selected
      >
        Submit
      </Button>
      {isSubmitted && (
        <div className="mt-4">
          {selectedAnswer === 3 ? (
            <p className="text-green-600">
              Correct! Paris is the capital of France.
            </p>
          ) : (
            <p className="text-red-600">Incorrect! Try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
