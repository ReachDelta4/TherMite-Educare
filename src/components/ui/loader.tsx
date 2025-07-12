import { twMerge } from "tailwind-merge";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-4",
  lg: "w-16 h-16 border-4",
};

export const Loader = ({ className, size = "md", ...props }: LoaderProps) => {
  return (
    <div
      className={twMerge(
        "border-primary/20 border-t-primary animate-spin rounded-full",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-[9999]">
      <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-xl shadow-2xl border">
        <Loader size="lg" />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}; 