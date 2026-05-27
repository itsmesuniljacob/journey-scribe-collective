import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/tools/trip-calculator")({
  component: TripCalculator,
  head: () => ({
    meta: [
      { title: "Trip Cost Calculator — My Travel Blog" },
      { name: "description", content: "Estimate the cost of your next trip line by line." },
    ],
  }),
});

interface Line { id: string; label: string; perPerson: number; perDay: number }

const DEFAULTS: Line[] = [
  { id: "fl", label: "Flights (one-off, per person)", perPerson: 600, perDay: 0 },
  { id: "ho", label: "Accommodation (per day)", perPerson: 0, perDay: 120 },
  { id: "fo", label: "Food (per person / day)", perPerson: 0, perDay: 40 },
  { id: "tr", label: "Local transit (per day)", perPerson: 0, perDay: 15 },
  { id: "ac", label: "Activities (per person / day)", perPerson: 0, perDay: 25 },
];

function TripCalculator() {
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(7);
  const [lines, setLines] = useState<Line[]>(DEFAULTS);
  const [currency, setCurrency] = useState("USD");

  const totals = useMemo(() => {
    const rows = lines.map((l) => ({
      label: l.label,
      total: l.perPerson * people + l.perDay * days * people,
    }));
    const grand = rows.reduce((s, r) => s + r.total, 0);
    return { rows, grand };
  }, [lines, people, days]);

  const update = (id: string, field: "perPerson" | "perDay", value: number) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Tools</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-6xl">Trip cost calculator</h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            A rough estimate is better than no estimate. Adjust the lines that matter and ignore the rest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <div className="grid gap-6 md:grid-cols-4 mb-10">
          <Field label="Travellers"><input type="number" min={1} value={people} onChange={(e) => setPeople(+e.target.value || 1)} className="input" /></Field>
          <Field label="Trip length (days)"><input type="number" min={1} value={days} onChange={(e) => setDays(+e.target.value || 1)} className="input" /></Field>
          <Field label="Currency"><input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} className="input" /></Field>
        </div>

        <div className="border hairline">
          <div className="grid grid-cols-12 gap-2 border-b hairline bg-muted/40 px-4 py-3 text-[11px] tracked-sm uppercase text-muted-foreground">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-right">Per person</div>
            <div className="col-span-2 text-right">Per day</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          {lines.map((l, i) => (
            <div key={l.id} className="grid grid-cols-12 items-center gap-2 border-b hairline px-4 py-3 last:border-b-0">
              <div className="col-span-6 text-sm">{l.label}</div>
              <div className="col-span-2">
                <input type="number" min={0} value={l.perPerson} onChange={(e) => update(l.id, "perPerson", +e.target.value || 0)} className="input text-right" />
              </div>
              <div className="col-span-2">
                <input type="number" min={0} value={l.perDay} onChange={(e) => update(l.id, "perDay", +e.target.value || 0)} className="input text-right" />
              </div>
              <div className="col-span-2 text-right font-medium">{currency} {totals.rows[i].total.toLocaleString()}</div>
            </div>
          ))}
          <div className="grid grid-cols-12 items-center gap-2 bg-foreground px-4 py-5 text-background">
            <div className="col-span-6 text-[11px] tracked-sm uppercase">Estimated total</div>
            <div className="col-span-6 text-right font-serif italic text-3xl">{currency} {totals.grand.toLocaleString()}</div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">Per-person costs are charged once (flights). Per-day costs multiply by travellers × days.</p>
      </section>

      <style>{`.input{ width:100%; background:transparent; border:1px solid var(--color-border); padding:.5rem .75rem; font-size:.875rem; outline:none; } .input:focus{ border-color: var(--color-foreground); }`}</style>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracked-sm uppercase text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
