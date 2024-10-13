"use client";

import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useErrorStore } from "@/stores/error";

export const useErrorHandler = () => {
  const { errors, removeError } = useErrorStore();
  const { toast } = useToast();

  useEffect(() => {
    errors.forEach((error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 5000,
        action: error.action,
      });
    });
  }, [errors, removeError, toast]);

  return useErrorStore;
};
