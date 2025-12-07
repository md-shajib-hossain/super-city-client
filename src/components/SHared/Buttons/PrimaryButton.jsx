import { PiIcon } from "lucide-react";

const PrimaryButton = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:bg-gray-200
          disabled:cursor-not-allowed
          rounded-none
          hover:scale-105
          transition
          cursor-pointer
        px-4
        
         text-sm
          
          ${outline ? "bg-white" : "bg-primary"}
          
          ${outline ? "text-black" : "text-white"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "py-1" : "py-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border" : "border-2"}
        `}
    >
      {Icon && (
        <PiIcon
          size={24}
          className="
              absolute
              left-4
              top-3
            "
        />
      )}
      {label}
    </button>
  );
};

export default PrimaryButton;
