import React, { useEffect, useRef, useState } from "react";
import Search from "./Search";

interface Option {
  value: string;
  label: string;
}

type Value = string | string[];

interface DorpdownProps {
  title: string;
  allowSearch: boolean;
  options: Option[];
  value: Value;
  multiple?: boolean;
  onChange: (newValue: Value) => void;
}

const Dropdown: React.FC<DorpdownProps> = ({
  title,
  allowSearch,
  options,
  value,
  onChange,
  multiple = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState(title);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Value>(value || []);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const onSelect = (value: string) => {
    let selected: Value;
    if (!multiple || typeof selectedOptions === 'string'){
      selected = value;
      setIsOpen(false);
    } else {
      if (selectedOptions.includes(value)) {
        selected = selectedOptions.filter((i) => i !== value);
      } else {
        selected = [...selectedOptions, value];
      }
    }

    setSelectedOptions(selected);
    onChange(selected);
  };
  useEffect(() => {
    if (searchedTerm.length > 0) {
      setFilteredOptions(
        options.filter((i) =>
          i.label.toLocaleLowerCase().includes(searchedTerm.toLocaleLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchedTerm, options]);

  useEffect(() => {
    if(!multiple || typeof selectedOptions === 'string') {
      setDropdownTitle(options.find(o => o.value === selectedOptions)?.label ?? title);
    }
  }, [selectedOptions])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownSearchButton"
        className="w-full text-sm flex justify-between items-center overflow-hidden relative whitespace-nowrap text-left font-light px-4 py-2 rounded-lg
         text-gray-900 border border-gray-300  bg-gray-50
         focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 active:border-orange-500
         dark:bg-gray-700 dark:border-gray-600 dark:text-white "
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="overflow-hidden">{dropdownTitle}</div>
        <svg
          className="w-2.5 h-2.5"
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
      </button>
      {isOpen && (
        <div
          id="dropdownSearch"
          className="absolute top-11 z-10 bg-white rounded-lg shadow w-96 dark:bg-gray-700"
        >
          {allowSearch && (
            <div className="p-3">
              <Search
                value={searchedTerm}
                onChange={(e) => setSearchedTerm(e.target.value)}
              />
            </div>
          )}
          <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
            {filteredOptions.map((i) => (
              <li key={i.value}>
                <div
                  onClick={() => onSelect(i.value)}
                  className="p-2 cursor-pointer relative rounded hover:bg-orange-50 dark:hover:bg-gray-600"
                >
                  {i.label}
                  {(multiple ? selectedOptions.includes(i.value) : selectedOptions === i.value) && (
                    <svg
                      className="w-4 h-4 text-orange-500 absolute right-2 top-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 12 4.7 4.5 9.3-9"
                      />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
