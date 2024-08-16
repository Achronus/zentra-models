import { Search } from "lucide-react";
import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

type SearchBoxProps = {
  placeholder?: string;
  formStyles?: string;
  inputStyles?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({
  placeholder,
  formStyles,
  inputStyles = "pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]",
  value,
  onChange,
}: SearchBoxProps) => {
  return (
    <form className={formStyles}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder ? placeholder : "Search..."}
          className={inputStyles}
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default SearchBox;
