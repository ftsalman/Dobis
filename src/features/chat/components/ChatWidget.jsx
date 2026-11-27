import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, SendHorizontal, X } from "lucide-react";
import { cn } from "@lib/cn";
import { SmartLink } from "@/components/SmartLink";
import { CHAT } from "../constants/chat";
import { getReply } from "../utils/reply";

let nextId = 1;
const makeMsg = (from, body) => ({ id: nextId++, from, ...body });

/** Glowing orb used as the assistant's avatar. */
// The assistant is the core from the logo: the ring is the business, the orange spark is the AI.
const Orb = ({ className }) => (
  <span
    aria-hidden="true"
    className={cn("relative block shrink-0 rounded-full shadow-[0_0_24px_-4px_rgba(110,139,255,0.6)]", className)}
    style={{
      background:
        "radial-gradient(circle closest-side, var(--color-spark) 0 21%, var(--color-navy) 22% 46.9%, var(--color-blue-on-dark) 47.6% 99%, transparent 100%)",
    }}
  />
);

const BotMessage = ({ msg, onChip, onNavigate, showLabel }) => (
  <div className="animate-stage-in">
    {showLabel && (
      <p className="mb-2 ml-1 font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
        {CHAT.botLabel}
      </p>
    )}
    <div className="max-w-[88%] whitespace-pre-line rounded-[20px] rounded-tl-md bg-white/[0.07] px-4 py-3 text-[15px] leading-relaxed text-white/90 ring-1 ring-white/10">
      {msg.text}
      {msg.links?.length > 0 && (
        <span className="mt-3 flex flex-wrap gap-2">
          {msg.links.map((l) => (
            <SmartLink
              key={l.href + l.label}
              href={l.href}
              onClick={onNavigate}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-canvas"
            >
              {l.label}
              <ArrowUpRight className="size-3.5" />
            </SmartLink>
          ))}
        </span>
      )}
    </div>
    {msg.chips?.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {msg.chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChip(c)}
            className="rounded-full bg-white/[0.08] px-3.5 py-2 text-[13.5px] font-medium text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/15 hover:text-white"
          >
            {c}
          </button>
        ))}
      </div>
    )}
  </div>
);

const UserMessage = ({ msg }) => (
  <div className="flex animate-stage-in justify-end">
    <p className="max-w-[80%] rounded-[20px] rounded-tr-md bg-flow px-4 py-2.5 text-[15px] leading-relaxed text-white">
      {msg.text}
    </p>
  </div>
);

const Typing = () => (
  <div
    className="flex w-fit items-center gap-1 rounded-[20px] rounded-tl-md bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/10"
    aria-label="Assistant is typing"
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="size-1.5 animate-bounce rounded-full bg-white/60"
        style={{ animationDelay: `${i * 140}ms` }}
      />
    ))}
  </div>
);

/** Floating assistant in the bottom-right corner of every page. */
export const ChatWidget = () => {
  // `?chat=open` in any URL opens the assistant on load (handy for "Chat with us" links).
  const [open, setOpen] = useState(
    () => new URLSearchParams(window.location.search).get("chat") === "open",
  );
  const [messages, setMessages] = useState(() => [
    makeMsg("bot", { text: CHAT.greeting, chips: CHAT.starters }),
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(0);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    // Old quick replies disappear once the conversation moves on.
    setMessages((m) => [
      ...m.map((x) => ({ ...x, chips: undefined })),
      makeMsg("user", { text }),
    ]);
    setInput("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, makeMsg("bot", getReply(text))]);
      setTyping(false);
    }, CHAT.typingMs);
  };

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-label={CHAT.name}
          className="fixed bottom-[92px] right-3 z-[60] flex h-[min(620px,calc(100dvh-112px))] w-[calc(100vw-24px)] origin-bottom-right animate-stage-in flex-col overflow-hidden rounded-[26px] bg-ink text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:right-6 sm:w-[400px]"
        >
          {/* soft colour glow behind the conversation */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_0%,rgba(47,91,255,0.22),transparent_60%),radial-gradient(70%_50%_at_0%_100%,rgba(255,122,26,0.10),transparent_60%)]" />

          <header className="relative flex items-center gap-3.5 border-b border-white/10 px-5 py-4">
            <Orb className="size-12" />
            <div className="flex-1">
              <p className="text-[17px] font-semibold">{CHAT.name}</p>
              <p className="flex items-center gap-1.5 font-label text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/55">
                <span className="size-2 rounded-full bg-emerald-500" />
                {CHAT.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </header>

          <div
            ref={listRef}
            data-lenis-prevent
            aria-live="polite"
            className="relative flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5"
          >
            {messages.map((msg, i) =>
              msg.from === "bot" ? (
                <BotMessage
                  key={msg.id}
                  msg={msg}
                  onChip={send}
                  onNavigate={() => setOpen(false)}
                  showLabel={messages[i - 1]?.from !== "bot"}
                />
              ) : (
                <UserMessage key={msg.id} msg={msg} />
              ),
            )}
            {typing && <Typing />}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative flex items-center gap-2.5 border-t border-white/10 p-4"
          >
            <label htmlFor="dobis-chat-input" className="sr-only">
              Message
            </label>
            <input
              id="dobis-chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={CHAT.placeholder}
              autoComplete="off"
              maxLength={300}
              className="h-[52px] min-w-0 flex-1 rounded-2xl bg-white/[0.07] px-4 text-[15px] text-white ring-1 ring-white/10 placeholder:text-white/40 focus:outline-none focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="grid size-[52px] shrink-0 place-items-center rounded-2xl bg-white text-ink transition-all hover:bg-canvas disabled:opacity-50"
            >
              <SendHorizontal className="size-5" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        className="group fixed bottom-4 right-3 z-[60] grid size-[60px] place-items-center rounded-full bg-ink text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] ring-[3px] ring-white/80 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <>
            <MessageCircle className="size-6" />
            <span className="absolute right-0.5 top-0.5 size-3.5 rounded-full bg-spark ring-2 ring-ink" />
          </>
        )}
      </button>
    </>
  );
};
