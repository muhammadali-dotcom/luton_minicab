import { fleet } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

// The six cars side by side. A real table, so people and search engines can compare capacities.
// Figures confirmed by the owner (November 2026), shown as "up to".
export function FleetCompare() {
  return (
    <section aria-labelledby="fleet-compare-heading" className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>AT A GLANCE</p>
        <h2 id="fleet-compare-heading" className={`${h2} mt-4 text-foreground`}>
          Compare our cars
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-paper">
          <table className="w-full min-w-[18rem] text-left text-base sm:text-[1.0625rem] text-foreground">
            <caption className="sr-only">Passengers and luggage for each car, up to the numbers shown</caption>
            <thead className="bg-alt">
              <tr>
                <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Car</th>
                <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Passengers</th>
                <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Large cases</th>
                <th scope="col" className="px-3 py-4 font-semibold sm:px-5">Hand luggage</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map(({ id, name, capacity }) => (
                <tr key={id} className="border-t border-border">
                  <th scope="row" className="px-3 py-1 font-semibold sm:px-5">
                    <a
                      href={`#${id}`}
                      className="inline-flex min-h-[44px] items-center font-display text-[1.125rem] underline sm:text-[1.25rem] decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                    >
                      {name}
                    </a>
                  </th>
                  <td className="px-3 py-3 sm:px-5">
                    <span className="hidden sm:inline">Up to </span>
                    {capacity.passengers}
                  </td>
                  <td className="px-3 py-3 sm:px-5">{capacity.cases}</td>
                  <td className="px-3 py-3 sm:px-5">{capacity.hand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-base text-foreground">
          Up to. Luggage space depends on bag sizes. Tell us what you’re bringing when you book.
        </p>
      </div>
    </section>
  );
}
