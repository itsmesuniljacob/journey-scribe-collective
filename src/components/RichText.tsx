import type { ReactNode } from "react";
import type { RichSpan } from "@/content/types";

/** Renders inline text with bold / italic / underline / strike / code / links. Falls back to plain text. */
export function RichText({ spans, text }: { spans?: RichSpan[]; text: string }) {
  if (!spans || spans.length === 0) return <>{text}</>;
  return (
    <>
      {spans.map((s, i) => {
        let node: ReactNode = s.text;
        if (s.code) node = <code className="rounded bg-muted px-1 py-0.5 text-[0.9em]">{node}</code>;
        if (s.bold) node = <strong className="font-semibold">{node}</strong>;
        if (s.italic) node = <em>{node}</em>;
        if (s.underline) node = <u>{node}</u>;
        if (s.strike) node = <s>{node}</s>;
        if (s.href) {
          const external = /^https?:\/\//.test(s.href);
          node = (
            <a
              href={s.href}
              className="font-medium text-rust underline decoration-rust/60 decoration-2 underline-offset-4 transition-colors hover:decoration-rust"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}
