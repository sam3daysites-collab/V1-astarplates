import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact A* Number Plates",
  description:
    "Talk to our team about an order, a custom design or a trade account. UK-based support, six days a week.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            We&apos;re here to help.
          </h1>
          <p className="mt-4 text-neutral-600">
            Questions about an order, a custom design or a trade account?
            Drop us a message and we&apos;ll come back to you within one
            working hour.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Order number (optional)" name="order" required={false} />
            <label className="block">
              <span className="text-sm font-medium text-neutral-800">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              />
            </label>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Send message
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Customer support
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Monday–Friday 9am–6pm
                <br />
                Saturday 10am–4pm
              </p>
              <p className="mt-3 text-sm">
                <a
                  href="mailto:admin@astarnumberplates.uk"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  admin@astarnumberplates.uk
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Trade accounts
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Garages, dealerships and bodyshops — we offer wholesale rates,
                priority dispatch and account billing.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Made in the UK
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Every plate is pressed, printed and dispatched from our UK
                workshop.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
      />
    </label>
  );
}
