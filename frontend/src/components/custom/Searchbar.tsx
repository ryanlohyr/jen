import debounce from "debounce";
import { Search } from "lucide-react";
import React from "react";

interface SearchbarProps {
  placeholder: string;
  onSearchChange: (value: string) => void;
  className?: string; // Add this line
}

const Searchbar: React.FC<SearchbarProps> = ({
  className,
  placeholder,
  onSearchChange,
}) => {
  return (
    <div
      className={`${className} flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-grey-600`}
    >
      <div className="p-2">
        <Search className="ml-2 mt-[2px] h-5 w-5" />
      </div>
      <input
        type="text"
        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 overflow-hidden whitespace-nowrap text-overflow-ellipsis"
        placeholder={placeholder}
        onChange={debounce((e) => onSearchChange(e.target.value), 100)}
      />
    </div>
  );
};

export default Searchbar;
