import PropTypes from "prop-types";
import { IconTextBox } from "./IconTextBox";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "@turtle-ui/utils";

export const SearchBox = ({
  className = "",
  placeholder = "Search...",
  inputClassName = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <IconTextBox
      type="search"
      className={cn("w-[270px] shrink-0", className)}
      inputClassName={cn("h-[36px] bg-surface text-body-sm", inputClassName)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      prefix={<MagnifyingGlassIcon size={18} />}
      {...props}
    />
  );
};

SearchBox.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

