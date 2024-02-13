import React from "react";

interface ListItemProps {
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endIconOnClick?: () => void;
  startIconOnClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, startIcon, endIcon, endIconOnClick, startIconOnClick }) => {
  return (
    <div className="p-4 flex gap-1 items-center text-sm font-medium w-full text-gray-900 dark:text-gray-300 ">
      {startIcon && (<div className={`w-5 h-5 ${startIconOnClick ? "cursor-pointer": ""}`} onClick={startIconOnClick}>
        {startIcon}
      </div>)}
      <div className="flex-grow">{text}</div>
      {endIcon && (<div className={`w-5 h-5 ${endIconOnClick ? "cursor-pointer": ""}`} onClick={endIconOnClick}>
        {endIcon}
      </div>)}
    </div>
  );
};

export default ListItem;
