import * as React from "react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface MoneyProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  highlight?: boolean;
}

export function Money({ amount, highlight = false, className, ...props }: MoneyProps) {
  return (
    <span
      className={cn(
        "font-medium tabular-nums text-slate-900",
        highlight && "font-bold text-amber-700",
        className,
      )}
      {...props}
    >
      {formatRupiah(amount)}
    </span>
  );
}
