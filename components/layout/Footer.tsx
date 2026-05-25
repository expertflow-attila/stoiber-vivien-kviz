import { Container } from "@/components/ui/Container";

const VIVIEN_SITE = "https://stoiber-vivien-weboldal.vercel.app";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-200/60 bg-cream-50/60">
      <Container width="wide" as="div" className="py-10">
        <div className="flex flex-col gap-3 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base">
            Stoiber Vivien{" "}
            <span className="serif-italic text-sage-700">
              — a demenciáról érthetően
            </span>
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
            <a
              href={VIVIEN_SITE}
              className="hover-cta hover:text-sage-700"
              target="_self"
            >
              Főoldal
            </a>
            <a
              href={`${VIVIEN_SITE}/rolam`}
              className="hover-cta hover:text-sage-700"
              target="_self"
            >
              Rólam
            </a>
            <a
              href={`${VIVIEN_SITE}/megjelenesek`}
              className="hover-cta hover:text-sage-700"
              target="_self"
            >
              Megjelenések
            </a>
            <a
              href={`${VIVIEN_SITE}/kapcsolat`}
              className="hover-cta hover:text-sage-700"
              target="_self"
            >
              Kapcsolat
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
