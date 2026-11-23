import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@lib/cn";
import { SmartLink } from "@/components/SmartLink";
import { NAV_ACTIONS, NAV_LINKS } from "@/constants/constants";
import { ADDONS, ALL_APPS, APP_GROUPS } from "@/constants/apps";
import { appHref } from "@/constants/appDetails";

export const Logo = ({ className }) => (
  <SmartLink href="/" className={cn("flex items-center gap-1.5 text-ink", className)} aria-label="Dobis home">
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 9.4 6.6l-4.7 1.7A5 5 0 0 0 12 7V2Z" />
      <path d="M22 12a10 10 0 0 1-6.6 9.4l-1.7-4.7A5 5 0 0 0 17 12h5Z" />
      <path d="M12 22a10 10 0 0 1-9.4-6.6l4.7-1.7A5 5 0 0 0 12 17v5Z" />
      <path d="M2 12a10 10 0 0 1 6.6-9.4l1.7 4.7A5 5 0 0 0 7 12H2Z" />
    </svg>
    <span className="font-display text-[22px] font-extrabold tracking-tight">Dobis</span>
  </SmartLink>
);

const AppTile = ({ app, className }) => (
  <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", app.tone, className)}>
    <app.icon className="size-[18px]" />
  </span>
);

/* ---------------------------------------------------------------- desktop panels */

const AppsPanel = ({ onNavigate }) => (
  <div className="rounded-3xl bg-card p-3 shadow-[0_30px_80px_-30px_rgba(35,35,35,0.45)] ring-1 ring-black/5">
    <div className="grid grid-cols-5 gap-1">
      {APP_GROUPS.map((group) => (
        <div key={group.id} className="p-2">
          <p className="px-2 pb-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink/45">{group.label}</p>
          <ul>
            {group.apps.map((app) => (
              <li key={app.id}>
                <SmartLink
                  href={appHref(app.id)}
                  onClick={onNavigate}
                  className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-canvas focus-visible:bg-canvas focus-visible:outline-none"
                >
                  <AppTile app={app} />
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{app.name}</span>
                    <span className="block text-[13px] leading-snug text-ink/55">{app.blurb}</span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mx-2 mt-1 border-t border-line px-2 pb-1 pt-3">
      <p className="flex items-center justify-between pb-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink/45">
        Partner add-ons
        <SmartLink href="/apps#addons" onClick={onNavigate} className="normal-case tracking-normal text-flow hover:text-flow-hover">
          All add-ons →
        </SmartLink>
      </p>
      <ul className="grid grid-cols-3 gap-1">
        {ADDONS.map((app) => (
          <li key={app.id}>
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-canvas focus-visible:bg-canvas focus-visible:outline-none"
            >
              <AppTile app={app} />
              <span className="flex-1">
                <span className="flex items-center gap-1 text-[15px] font-semibold text-ink">
                  {app.name}
                  <ArrowUpRight className="size-3.5 text-ink/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flow" />
                </span>
                <span className="block text-[13px] leading-snug text-ink/55">{app.blurb}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-canvas px-5 py-3.5">
      <p className="text-[14px] text-ink/70">
        <span className="font-semibold text-ink">{ALL_APPS.length} apps, one login, one database.</span> Start with one and add the rest anytime.
      </p>
      <div className="flex shrink-0 items-center gap-5 text-[14px] font-semibold">
        <SmartLink href="/pricing" onClick={onNavigate} className="text-ink hover:text-flow">
          Compare plans
        </SmartLink>
        <SmartLink href="/apps" onClick={onNavigate} className="group flex items-center gap-1 text-flow">
          See all apps <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
      </div>
    </div>
  </div>
);

const ListPanel = ({ items, onNavigate }) => (
  <div className="w-[560px] rounded-3xl bg-card p-2.5 shadow-[0_30px_80px_-30px_rgba(35,35,35,0.45)] ring-1 ring-black/5">
    <ul className="grid grid-cols-2 gap-1">
      {items.map(({ id, label, description, href, icon: Icon }) => (
        <li key={id}>
          <SmartLink
            href={href}
            onClick={onNavigate}
            className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-canvas focus-visible:bg-canvas focus-visible:outline-none"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-canvas text-ink">
              <Icon className="size-[18px]" />
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-ink">{label}</span>
              <span className="block text-[13px] leading-snug text-ink/55">{description}</span>
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------------------------------------------------------------- mobile menu */

const MobileSection = ({ title, open, onToggle, children }) => (
  <li className="border-b border-black/5">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center justify-between px-1 py-4 text-left text-[17px] font-medium text-ink"
    >
      {title}
      <ChevronDown className={cn("size-5 text-ink/50 transition-transform duration-300", open && "rotate-180")} />
    </button>
    {open && <div className="animate-fade-in pb-4">{children}</div>}
  </li>
);

const MobileMenu = ({ onClose }) => {
  const [section, setSection] = useState(null);
  const toggle = (id) => setSection((cur) => (cur === id ? null : id));

  return (
    <div
      id="mobile-menu"
      data-lenis-prevent
      className="mx-auto mt-2 max-h-[calc(100dvh-96px)] max-w-[1376px] animate-fade-in overflow-y-auto overscroll-contain rounded-3xl bg-card p-4 shadow-xl shadow-ink/10 lg:hidden"
    >
      <ul>
        {NAV_LINKS.map((link) => {
          if (link.menu === "apps") {
            return (
              <MobileSection key={link.id} title={link.label} open={section === link.id} onToggle={() => toggle(link.id)}>
                <div className="space-y-4">
                  {APP_GROUPS.map((group) => (
                    <div key={group.id}>
                      <p className="px-1 pb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">{group.label}</p>
                      <ul className="grid grid-cols-2 gap-1">
                        {group.apps.map((app) => (
                          <li key={app.id}>
                            <SmartLink href={appHref(app.id)} onClick={onClose} className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-canvas">
                              <AppTile app={app} className="size-8" />
                              <span className="text-[15px] font-medium text-ink">{app.name}</span>
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div>
                    <p className="px-1 pb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">Partner add-ons</p>
                    <ul className="grid grid-cols-2 gap-1">
                      {ADDONS.map((app) => (
                        <li key={app.id}>
                          <a href={app.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-canvas">
                            <AppTile app={app} className="size-8" />
                            <span className="text-[15px] font-medium text-ink">{app.name}</span>
                            <ArrowUpRight className="size-3.5 text-ink/35" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MobileSection>
            );
          }
          if (link.children) {
            return (
              <MobileSection key={link.id} title={link.label} open={section === link.id} onToggle={() => toggle(link.id)}>
                <ul className="space-y-0.5">
                  {link.children.map(({ id, label, href, icon: Icon }) => (
                    <li key={id}>
                      <SmartLink href={href} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 text-[15px] text-ink hover:bg-canvas">
                        <Icon className="size-[18px] text-ink/60" />
                        {label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </MobileSection>
            );
          }
          return (
            <li key={link.id} className="border-b border-black/5">
              <SmartLink href={link.href} onClick={onClose} className="block px-1 py-4 text-[17px] font-medium text-ink">
                {link.label}
              </SmartLink>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <SmartLink href={NAV_ACTIONS.login.href} onClick={onClose} className="rounded-full border border-black/10 py-3 text-center font-semibold text-ink">
          {NAV_ACTIONS.login.label}
        </SmartLink>
        <SmartLink href={NAV_ACTIONS.primary.href} onClick={onClose} className="rounded-full bg-flow py-3 text-center font-semibold text-canvas">
          {NAV_ACTIONS.primary.label}
        </SmartLink>
        <SmartLink href={NAV_ACTIONS.demo.href} onClick={onClose} className="col-span-2 rounded-full bg-canvas py-3 text-center font-semibold text-ink">
          {NAV_ACTIONS.demo.label}
        </SmartLink>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- navbar */

/**
 * Sticky: always pinned to the top. Transparent over the hero, a floating frosted bar once scrolled.
 */
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState(null); // id of the open desktop panel
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const closeTimer = useRef(0);
  const anyOpen = mobileOpen || menu !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape or a click outside closes any open menu.
  useEffect(() => {
    if (!anyOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    const onDown = (e) => {
      if (!navRef.current?.contains(e.target)) {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [anyOpen]);

  const openMenu = (id) => {
    clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };
  const closeAll = () => {
    setMenu(null);
    setMobileOpen(false);
  };

  const active = NAV_LINKS.find((l) => l.id === menu);
  const solid = scrolled || anyOpen;

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6 lg:px-4"
    >
      <nav
        aria-label="Main"
        onMouseLeave={closeSoon}
        className={cn(
          "relative mx-auto mt-3 flex h-[64px] max-w-[1376px] items-center justify-between rounded-[22px] pl-5 pr-2.5 transition-[background-color,box-shadow,backdrop-filter] duration-300 lg:pl-6",
          solid
            ? "bg-card/85 shadow-[0_10px_40px_-14px_rgba(35,35,35,0.3)] ring-1 ring-black/5 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center">
            {NAV_LINKS.map((link) => {
              const hasPanel = link.menu || link.children;
              if (!hasPanel) {
                return (
                  <li key={link.id}>
                    <SmartLink
                      href={link.href}
                      onMouseEnter={closeSoon}
                      className="rounded-full px-3.5 py-2 text-[16px] text-ink/75 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                );
              }
              const isOpen = menu === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`menu-${link.id}`}
                    onMouseEnter={() => openMenu(link.id)}
                    onClick={() => (isOpen ? setMenu(null) : openMenu(link.id))}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-[16px] transition-colors",
                      isOpen ? "bg-black/[0.04] text-ink" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")} strokeWidth={1.75} />
                  </button>
                </li>
              );
            })}
          </ul>

          <span className="mx-3 h-6 w-px bg-black/10" aria-hidden="true" />

          <SmartLink href={NAV_ACTIONS.login.href} className="rounded-full px-3.5 py-2 text-[16px] font-medium text-ink transition-colors hover:text-flow">
            {NAV_ACTIONS.login.label}
          </SmartLink>
          <SmartLink
            href={NAV_ACTIONS.demo.href}
            className="rounded-full border border-black/10 px-4 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-card"
          >
            {NAV_ACTIONS.demo.label}
          </SmartLink>
          <SmartLink
            href={NAV_ACTIONS.primary.href}
            className="ml-1.5 rounded-full bg-flow px-5 py-2.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-flow-hover"
          >
            {NAV_ACTIONS.primary.label}
          </SmartLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full text-ink hover:bg-black/5 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* desktop panel: apps span the bar's width, lists sit under their trigger area */}
        {active && (
          <div
            id={`menu-${active.id}`}
            onMouseEnter={() => openMenu(active.id)}
            className={cn(
              "absolute top-full hidden animate-fade-in pt-2.5 lg:block",
              active.menu === "apps" ? "inset-x-0" : "right-[300px]",
            )}
          >
            {active.menu === "apps" ? (
              <AppsPanel onNavigate={closeAll} />
            ) : (
              <ListPanel items={active.children} onNavigate={closeAll} />
            )}
          </div>
        )}
      </nav>

      {mobileOpen && <MobileMenu onClose={closeAll} />}
    </header>
  );
};
