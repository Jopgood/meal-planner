// components/forms/sign-up/error-menu.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "./types";
import { XCircle, CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ErrorMenuProps {
  errors: ErrorState | null;
}

const errorMessages = {
  first_name: "Please enter your first name.",
  last_name: "Please enter your last name.",
  email: "Please enter a valid email address.",
  password: "Your password doesn't meet the requirements.",
  api: "There was a problem with your request. Please try again.",
};

export default function ErrorMenu({ errors }: Readonly<ErrorMenuProps>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [errors]);

  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div
      className={`w-100 transform transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-700">
            Please Fix the Following
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.keys(errors).map((field) => (
              <div key={field} className="flex items-start space-x-2 mt-0.5">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">
                  {errorMessages[field as keyof typeof errorMessages] ||
                    "An error occurred with this field."}
                </span>
                {field === "password" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className="h-5 w-5 text-red-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Minimum 8 characters</li>
                            <li>At least 1 uppercase letter</li>
                            <li>At least 1 lowercase letter</li>
                            <li>At least 1 number</li>
                            <li>At least 1 special character</li>
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
