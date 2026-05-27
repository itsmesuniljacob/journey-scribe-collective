import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children, overlay = false }: { children: React.ReactNode; overlay?: boolean }) {
  return (
    <>
      <SiteHeader overlay={overlay} />
      <main className={overlay ? "" : "pt-20"}>{children}</main>
      <SiteFooter />
    </>
  );
}
