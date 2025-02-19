import React from "react";

interface TestimonialCardProps {
  feedback: string;
  userName: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ feedback, userName }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <p className="italic text-gray-700">"{feedback}"</p>
      <div className="flex items-center mt-4">
        <span className="text-green-500 text-xl">🌿</span>
        <p className="ml-2 font-bold text-gray-900">{userName}</p>
       
      </div>
    </div>
  );
};

export default TestimonialCard;
