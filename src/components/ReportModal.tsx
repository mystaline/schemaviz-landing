"use client";

import { useState, useEffect, useRef } from "react";

const COOLDOWN_KEY = "schema_viz_last_report";
const COOLDOWN_SECONDS = 86400;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: Props) {
  const [type, setType] = useState("Bug Report");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState("");
  const [cooldownHoursLeft, setCooldownHoursLeft] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  const charsLeft = 1000 - message.length;
  const canSubmit = message.trim().length > 0 && charsLeft >= 0 && cooldownHoursLeft === 0 && !isSubmitting;

  const checkCooldown = () => {
    try {
      const last = localStorage.getItem(COOLDOWN_KEY);
      if (!last) { setCooldownHoursLeft(0); return; }
      const elapsed = Math.floor(Date.now() / 1000) - Number(last);
      const remaining = COOLDOWN_SECONDS - elapsed;
      setCooldownHoursLeft(remaining > 0 ? Math.ceil(remaining / 3600) : 0);
    } catch {
      setCooldownHoursLeft(0);
    }
  };

  const markSubmitted = () => {
    try {
      localStorage.setItem(COOLDOWN_KEY, String(Math.floor(Date.now() / 1000)));
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (isOpen) {
      setType("Bug Report");
      setMessage("");
      setEmail("");
      setInlineError("");
      setIsSubmitting(false);
      checkCooldown();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setInlineError("");

    const subject = `[SchemaViz Landing] ${type} — ${message.slice(0, 60)}${message.length > 60 ? "…" : ""}`;
    const body = `Type: ${type}\n\n${message}\n\nReply to: ${email.trim() || "not provided"}`;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REPORT_WORKER_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "SchemaViz Landing",
          subject,
          from_name: email.trim() || "Anonymous",
          message: body,
        }),
      });

      if (res.ok) {
        markSubmitted();
        onClose();
      } else if (res.status === 429) {
        try {
          const data = await res.json();
          setInlineError(data.error ?? "Too many reports. Try again later.");
        } catch {
          setInlineError("Too many reports. Try again later.");
        }
      } else {
        setInlineError("Failed to send report. Please try again.");
      }
    } catch {
      setInlineError("Failed to send report. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="bg-secondary-900 border border-secondary-700 rounded-3xl shadow-2xl p-8 space-y-6 w-full max-w-md">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-black uppercase tracking-tight text-secondary-50">
            Report / Feedback
          </h2>
          <p className="text-xs text-secondary-500 font-mono">
            Your message goes directly to the developer.
          </p>
        </div>

        {/* Cooldown banner */}
        {cooldownHoursLeft > 0 && (
          <div className="px-4 py-3 rounded-xl bg-warning-400/10 border border-warning-400/30 text-warning-400 text-xs font-medium">
            You can send another report in {cooldownHoursLeft}h.
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-secondary-800 border border-secondary-700 rounded-xl px-4 py-3 text-sm text-secondary-100 focus:border-primary-500 focus:outline-none transition-all focus:ring-4 focus:ring-primary-500/10"
            >
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">Message</label>
              <span className={`text-[10px] font-mono ${charsLeft < 0 ? "text-danger-500" : "text-secondary-500"}`}>
                {charsLeft}
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Describe the issue or idea..."
              readOnly={cooldownHoursLeft > 0}
              className={`w-full bg-secondary-800 border border-secondary-700 rounded-xl px-4 py-3 text-sm text-secondary-100 focus:border-primary-500 focus:outline-none transition-all focus:ring-4 focus:ring-primary-500/10 resize-none placeholder:text-secondary-600 ${cooldownHoursLeft > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">
              Your Email{" "}
              <span className="normal-case font-normal text-secondary-600">(optional — for follow-up)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-secondary-800 border border-secondary-700 rounded-xl px-4 py-3 text-sm text-secondary-100 focus:border-primary-500 focus:outline-none transition-all focus:ring-4 focus:ring-primary-500/10 placeholder:text-secondary-600"
            />
          </div>

          {/* Inline error */}
          {inlineError && (
            <p className="text-xs text-danger-500 font-medium">{inlineError}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-secondary-700 text-secondary-400 text-sm font-bold hover:bg-secondary-800 transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20 cursor-pointer"
            >
              {isSubmitting ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
