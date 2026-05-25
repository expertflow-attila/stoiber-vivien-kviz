import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="premium-page py-section">
      <Container width="default" className="text-center">
        <span className="label-eyebrow text-sage-700">Hupsz</span>
        <h1 className="mt-4 text-display-xl font-display">
          Ez az oldal nincs{" "}
          <span className="serif-italic text-sage-700">meg</span>
        </h1>
        <p className="mt-5 text-body-lg text-ink-700">
          Lehet, hogy a hivatkozás elavult. Kezdjük a kvízzel?
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="hover-cta inline-flex items-center gap-3 rounded-[10px] bg-sage-700 px-7 py-3.5 text-base font-medium text-cream-50 hover:bg-sage-800"
          >
            Vissza a kvízhez
          </Link>
        </div>
      </Container>
    </div>
  );
}
