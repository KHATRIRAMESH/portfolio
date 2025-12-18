import { cn } from "@/lib/utils";

export const Label = ({ children, className, ...props }) => {
    return (
        <label
            className={cn(
                "block font-medium mb-2 text-inherit",
                className?.includes('text-lg') ? "text-lg" : "text-sm",
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
};
