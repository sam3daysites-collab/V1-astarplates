import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Confirmed",
  description: "Thanks for your order. We'll start work as soon as your documents are verified.",
  path: "/order-success",
  noIndex: true,
});

export default function OrderSuccessPage() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d4af37] text-2xl font-bold text-black">
          ✓
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Order confirmed
        </h1>
        <p className="mt-4 text-white/70">
          Thanks for your order. We&apos;ve sent a confirmation email with your
          receipt. We&apos;ll review your documents and start pressing as soon
          as your entitlement is verified — usually within an hour during
          working hours.
        </p>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          <Card title="1. Verify">
            We check your ID and entitlement document against the registration.
          </Card>
          <Card title="2. Press">
            Your plates are pressed, printed and QC&apos;d in-house the same day.
          </Card>
          <Card title="3. Dispatch">
            Tracked UK delivery, usually 1–2 working days.
          </Card>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d]"
          >
            Need help?
          </Link>
        </div>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
        {title}
      </p>
      <p className="mt-3 text-sm text-white/70">{children}</p>
    </div>
  );
}
