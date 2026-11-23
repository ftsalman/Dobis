import React from "react";
import { cn } from "@lib/cn";

/** An app's coloured icon square. Size it with className (default size-9). */
export const AppTile = ({ app, className, iconClassName }) => (
  <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", app.tone, className)}>
    <app.icon className={cn("size-[18px]", iconClassName)} />
  </span>
);
