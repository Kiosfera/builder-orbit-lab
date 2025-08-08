import React from "react";
import { cn } from "@/lib/utils";

interface FormGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function ResponsiveFormGrid({
  children,
  cols = 2,
  className,
}: FormGridProps) {
  const gridClass = {
    1: "grid grid-cols-1 gap-3 sm:gap-4",
    2: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
    3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
  };

  return <div className={cn(gridClass[cols], className)}>{children}</div>;
}

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveFormField({ children, className }: FormFieldProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export default { ResponsiveFormGrid, ResponsiveFormField };
