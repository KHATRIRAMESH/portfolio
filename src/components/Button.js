import { cn } from "@/lib/utils";

const Button = ({ children, className, small, fullWidth, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-[5px] font-semibold cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-[1px] disabled:bg-[#666] disabled:cursor-not-allowed disabled:opacity-60 border-0",
        small ? "text-[14px] px-[16px] py-[8px]" : "text-[16px] px-[24px] py-[12px]",
        fullWidth ? "w-full" : "w-auto",
        // Handle dynamic background/color logic if not overridden by className
        !className?.includes('bg-') && "bg-[#d0bb57]",
        !className?.includes('text-') && "text-[#0F1624]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
