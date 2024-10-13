import React from "react";
import { Spinner } from "@/components/icons";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
  fullScreen = true,
  className = "",
}) => {
  const containerClasses = `flex flex-col items-center justify-center ${
    fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : ""
  } ${className}`;

  return (
    <div className={containerClasses}>
      <Spinner />
      {message && <p className="mt-4 text-muted-foreground">{message}</p>}
    </div>
  );
};
