import React from "react";
import { cn } from "@lib/cn";

/** Published product symbols include their spark. Partner add-ons keep their own treatment. */
export const AppTile = ({ app, className, iconClassName }) => (
  <span
    aria-hidden="true"
    className={cn("relative grid size-9 shrink-0 place-items-center rounded-[22.5%]", app.color ? "text-white" : app.tone, className)}
    style={app.color ? { backgroundColor: app.color } : undefined}
  >
    {app.symbol ? (
      <img src={app.symbol} className="size-full" alt="" />
    ) : (
      <>
        <app.icon className={cn("size-1/2", iconClassName)} />
        {app.color && <span className="absolute right-[18%] top-[18%] size-[15%] rounded-full border border-white bg-spark" />}
      </>
    )}
  </span>
);
