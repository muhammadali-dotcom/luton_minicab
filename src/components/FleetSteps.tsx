import { container, h2, section } from "./ui";

const steps = [
  {
    title: "Count your passengers and bags",
    text: "Include hand luggage and anything bulky, like golf clubs or a pushchair.",
  },
  { title: "Compare in the booker", text: "You’ll see each car’s limits before you confirm." },
  { title: "Ask us", text: "Call or WhatsApp us, and we’ll help you choose." },
];

export function FleetSteps() {
  return (
    <section id="not-sure" aria-labelledby="fleet-steps-heading" className={`scroll-mt-20 border-t border-border ${section}`}>
      <div className={container}>
        <h2 id="fleet-steps-heading" className={`${h2} text-foreground`}>
          Not sure which car?
        </h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map(({ title, text }, i) => (
            <li key={title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-primary font-display text-xl font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-[1.0625rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
