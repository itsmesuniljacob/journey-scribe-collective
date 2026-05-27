import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/itinerary-builder")({
  component: ItineraryBuilder,
  head: () => ({
    meta: [
      { title: "Itinerary Builder — My Travel Blog" },
      { name: "description", content: "Sketch a day-by-day trip plan, saved in your browser." },
    ],
  }),
});

interface Day { id: string; title: string; items: string[] }

function ItineraryBuilder() {
  const [tripName, setTripName] = useState("Untitled trip");
  const [days, setDays] = useState<Day[]>([
    { id: crypto.randomUUID(), title: "Arrival", items: ["Land + check in", "Walk the neighbourhood"] },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("itinerary");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTripName(parsed.tripName ?? "Untitled trip");
        setDays(parsed.days ?? []);
      } catch {}
    }
  }, []);

  const save = () => {
    localStorage.setItem("itinerary", JSON.stringify({ tripName, days }));
    toast.success("Itinerary saved to this browser.");
  };

  const addDay = () =>
    setDays((d) => [...d, { id: crypto.randomUUID(), title: `Day ${d.length + 1}`, items: [""] }]);
  const removeDay = (id: string) => setDays((d) => d.filter((x) => x.id !== id));
  const updateDayTitle = (id: string, title: string) =>
    setDays((d) => d.map((x) => (x.id === id ? { ...x, title } : x)));
  const addItem = (id: string) =>
    setDays((d) => d.map((x) => (x.id === id ? { ...x, items: [...x.items, ""] } : x)));
  const updateItem = (id: string, idx: number, val: string) =>
    setDays((d) => d.map((x) => (x.id === id ? { ...x, items: x.items.map((it, i) => (i === idx ? val : it)) } : x)));
  const removeItem = (id: string, idx: number) =>
    setDays((d) => d.map((x) => (x.id === id ? { ...x, items: x.items.filter((_, i) => i !== idx) } : x)));

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Tools</p>
          <input
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="mt-3 w-full bg-transparent font-serif italic text-5xl md:text-6xl focus:outline-none"
          />
          <p className="mt-4 text-sm text-muted-foreground">Saved in your browser. No account needed.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-8">
          {days.map((day, i) => (
            <div key={day.id} className="border hairline">
              <div className="flex items-center justify-between border-b hairline px-5 py-4">
                <div className="flex items-center gap-3">
                  <GripVertical size={14} className="text-muted-foreground" />
                  <span className="text-[11px] tracked-sm uppercase text-rust">Day {i + 1}</span>
                  <input
                    value={day.title}
                    onChange={(e) => updateDayTitle(day.id, e.target.value)}
                    className="font-serif italic text-xl bg-transparent focus:outline-none"
                  />
                </div>
                <button onClick={() => removeDay(day.id)} aria-label="Remove day" className="text-muted-foreground hover:text-rust">
                  <Trash2 size={14} />
                </button>
              </div>
              <ul className="divide-y divide-border">
                {day.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 px-5 py-2">
                    <span className="text-rust">—</span>
                    <input
                      value={item}
                      onChange={(e) => updateItem(day.id, idx, e.target.value)}
                      placeholder="Add an activity…"
                      className="flex-1 bg-transparent py-2 text-base focus:outline-none"
                    />
                    <button onClick={() => removeItem(day.id, idx)} className="text-muted-foreground hover:text-rust">
                      <Trash2 size={12} />
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => addItem(day.id)} className="flex w-full items-center gap-2 px-5 py-3 text-[11px] tracked-sm uppercase text-muted-foreground hover:text-rust">
                <Plus size={12} /> Add activity
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button onClick={addDay} className="inline-flex items-center gap-2 border hairline px-5 py-3 text-[11px] tracked-sm uppercase hover:border-foreground">
            <Plus size={14} /> Add day
          </button>
          <button onClick={save} className="bg-foreground px-6 py-3 text-[11px] tracked-sm uppercase text-background hover:bg-rust">
            Save itinerary
          </button>
        </div>
      </section>
    </PageShell>
  );
}
