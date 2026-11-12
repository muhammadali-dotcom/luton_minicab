"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";

const fieldClass =
  "mt-2 block w-full min-h-[44px] rounded-control border border-input bg-paper px-4 py-2.5 text-[1.0625rem] text-foreground";
const labelClass = "block text-base font-semibold text-foreground";
const types = ["New journey", "Existing booking", "Other"];

// No email service yet: "Continue on WhatsApp" opens WhatsApp with the enquiry written out, ready to
// send, so nothing is stored on the website.
export function ContactForm() {
  const [type, setType] = useState(types[0]);
  if (!site.whatsapp) return null;
  const number = site.whatsapp;

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const text = [
      `Enquiry: ${get("type")}`,
      ...(get("reference") ? [`Booking reference: ${get("reference")}`] : []),
      `Name: ${get("name")}`,
      ...(get("email") ? [`Email: ${get("email")}`] : []),
      ...(get("phone") ? [`Phone: ${get("phone")}`] : []),
      "",
      get("message"),
    ].join("\n");
    window.location.href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  return (
    <form onSubmit={send} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="font-normal">(optional)</span>
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className={labelClass}>
          Phone <span className="font-normal">(optional)</span>
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>
      <fieldset>
        <legend className={labelClass}>Enquiry type</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {types.map((option) => (
            <label
              key={option}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-input bg-paper px-4 text-base text-foreground has-[:checked]:border-foreground has-[:checked]:bg-primary/45"
            >
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="accent-foreground"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      {type === "Existing booking" && (
        <div>
          <label htmlFor="cf-reference" className={labelClass}>
            Booking reference <span className="font-normal">(optional)</span>
          </label>
          <input id="cf-reference" name="reference" type="text" className={fieldClass} />
        </div>
      )}
      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea id="cf-message" name="message" required rows={5} className={`${fieldClass} resize-y`} />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-control bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
      >
        <MessageCircle aria-hidden size={18} strokeWidth={1.75} />
        Continue on WhatsApp
      </button>
      <p className="text-base text-foreground">This opens WhatsApp with your message ready to send. We don’t store it on this website.</p>
    </form>
  );
}
