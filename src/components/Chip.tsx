import React from "react";

interface ChipProps {
  label: string;
  color: "blue" | "purple" | "green";
  onRemove?: (value: string) => void;
}

const Chip: React.FC<ChipProps> = ({ label, color, onRemove }) => {
  const colorMap = {
    bg: {
      green: "bg-green-100",
      blue: "bg-blue-100",
      purple: "bg-purple-100",
    },
    bgDark: {
      green: "dark:bg-green-900",
      blue: "dark:bg-blue-900",
      purple: "dark:bg-purple-900",
    },
    text: {
      green: "text-green-700",
      blue: "text-blue-700",
      purple: "text-purple-700",
    },
    textDark: {
      green: "dark:text-green-200",
      blue: "dark:text-blue-200",
      purple: "dark:text-purple-200",
    },
  };
  return (
    <div
      className={`text-sm ${colorMap.bg[color]} ${colorMap.bgDark[color]} ${colorMap.text[color]} ${colorMap.textDark[color]} py-1 px-3 font-medium rounded-md flex-item`}
    >
      {label}
      {onRemove && (
        <svg
          className="w-5 h-5 p-1 inline ml-1 cursor-pointer"
          onClick={() => onRemove(label)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M6 18 18 6m0 12L6 6"
          />
        </svg>
      )}
    </div>
  );
};

export default Chip;
