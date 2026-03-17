import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const { data, error } = await supabase.functions.invoke("notify-signup", {
        body: { email },
      });

      if (error) throw error;

      setStatus("success");
      setMessage(data?.message || "Thanks for signing up!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-kagnew-contact py-24 md:py-32 px-6">
      <div className="max-w-[520px] mx-auto text-center">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
          Stay Informed
        </p>
        <h2 className="scroll-fade font-chivo text-3xl md:text-[38px] font-extrabold text-foreground leading-tight mb-4">
          Be Part of This Story
        </h2>
        <p className="scroll-fade font-source-serif text-base text-foreground/60 mb-10">
          Sign up to receive updates on the film's progress, screening announcements, and ways to
          support the preservation of this history.
        </p>

        {status === "success" ? (
          <p className="scroll-fade font-source-serif text-base text-primary mb-16">
            {message}
          </p>
        ) : (
          <>
            <form
              className="scroll-fade flex flex-col sm:flex-row gap-3 mb-4"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="flex-1 bg-kagnew-card border border-primary/30 text-foreground placeholder:text-kagnew-muted px-4 py-3 font-source-serif text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="font-space-mono text-sm uppercase tracking-[0.1em] bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Notify Me"}
              </button>
            </form>
            {status === "error" && (
              <p className="font-source-serif text-sm text-destructive mb-4">{message}</p>
            )}
            <p className="scroll-fade font-space-mono text-[10px] text-kagnew-muted mb-16">
              No spam. Only updates that matter.
            </p>
          </>
        )}

        <hr className="gold-rule mb-8" />

        <p className="font-space-mono text-[11px] text-kagnew-muted tracking-wider">
          © 2025 KAGNEW DOCUMENTARY — ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  );
}
