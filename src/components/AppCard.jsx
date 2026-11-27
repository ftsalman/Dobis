import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/SmartLink";
import { AppTile } from "@/components/AppTile";
import { appHref } from "@/constants/appDetails";

/** A clickable card for one app: icon, name, one-line blurb. */
export const AppCard = ({ app }) => (
  <SmartLink
    href={appHref(app.id)}
    className="group flex h-full items-center gap-3 rounded-2xl bg-card p-3.5 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,27,76,0.45)]"
  >
    <AppTile app={app} className="size-11 rounded-xl" iconClassName="size-5" />
    <span className="min-w-0 flex-1">
      <span className="block text-[15.5px] font-semibold text-ink">{app.name}</span>
      <span className="block text-[13.5px] leading-snug text-ink/60">{app.blurb}</span>
    </span>
    <ArrowUpRight className="size-4 shrink-0 self-start text-ink/30 transition-colors group-hover:text-flow" />
  </SmartLink>
);
