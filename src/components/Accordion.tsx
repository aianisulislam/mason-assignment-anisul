import React, { useState } from "react";

interface AccordionProps {
    title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 relative cursor-pointer font-medium text-semibold w-full text-gray-600 dark:text-gray-400 ${isOpen? "bg-gray-100 dark:bg-gray-700 border-b" : "bg-gray-50 dark:bg-gray-800"} border-gray-200 dark:border-gray-600`}
      >
        {title}
        <svg
          className={`w-2.5 h-2.5 absolute right-5 top-5 ${isOpen? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>
      <div
        className="block"
        style={{
          maxHeight: isOpen ? 1000 : 0,
          overflow: "hidden",
          transition: "all 0.3s ease-in",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;