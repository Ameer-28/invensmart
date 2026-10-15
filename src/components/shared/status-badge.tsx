import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SemanticStatus = "safe" | "warning" | "danger" | "neutral";

export interface StatusBadgeProps {
  status: SemanticStatus;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const variantMap = {
    safe: "success" as const,
    warning: "warning" as const,
    danger: "destructive" as const,
    neutral: "outline" as const,
  };

  const dotColorMap = {
    safe: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    neutral: "bg-slate-400",
  };

  return (
    <Badge
      variant={variantMap[status]}
      className={cn("inline-flex items-center gap-1.5 py-1 px-2.5 font-medium", className)}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColorMap[status])} />
      {label}
    </Badge>
  );
}
