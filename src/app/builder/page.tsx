import Link from "next/link";
import PlatePreview from "@/components/PlatePreview";
import { PLATE_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { formatGBP } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Plate Builder — Design Your Number Plate",
  description:
    "Design your plate live. Choose finish, badge, border and size — preview the exact number plate you&apos;ll receive before you order.",
  path: "/builder",
});

export default function BuilderPage() {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Plate Builder
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Design your plate
          </h1>
          <p className="mt-4 text-neutral-600">
            Type your registration, pick a finish and preview the exact plate
            we&apos;ll press. Road legal plates require document verification
            before production.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div>
              <label
                htmlFor="reg"
                className="text-sm font-medium text-neutral-800"
              >
                Registration
              </label>
              <input
                id="reg"
                name="reg"
                type="text"
                defaultValue="A* 1"
                maxLength={8}
                spellCheck={false}
                autoComplete="off"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-lg uppercase tracking-[0.2em] text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Up to 8 characters, letters and numbers only.
              </p>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium text-neutral-800">
                Finish
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PLATE_PRODUCTS.map((p, idx) => (
                  <label
                    key={p.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition hover:border-neutral-900/40"
                  >
                    <input
                      type="radio"
                      name="finish"
                      value={p.id}
                      defaultChecked={idx === 1}
                      className="h-4 w-4 accent-neutral-900"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900">
                        {p.shortName}
                      </p>
                      <p className="text-xs text-neutral-500">
                        From {formatGBP(p.singlePence)}{" "}
                        {p.roadLegal ? "· Road legal" : "· Show only"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium text-neutral-800">
                Quantity
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 hover:border-neutral-900/40">
                  <input
                    type="radio"
                    name="qty"
                    value="single"
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    Single plate
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 hover:border-neutral-900/40">
                  <input
                    type="radio"
                    name="qty"
                    value="pair"
                    defaultChecked
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    Pair (front + rear)
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium text-neutral-800">
                Accessories
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 hover:border-neutral-900/40">
                  <input
                    type="checkbox"
                    name="fixing-kit"
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    Fixing kit — £4.99
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 hover:border-neutral-900/40">
                  <input
                    type="checkbox"
                    name="adhesive"
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    Sticky strips — £3.99
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <strong className="font-semibold">Road legal plates</strong>{" "}
              require document verification before we press. You&apos;ll upload
              your documents after adding to cart.{" "}
              <Link
                href="/documents-required"
                className="underline underline-offset-2"
              >
                What documents do I need?
              </Link>
            </div>

            <Link
              href="/cart"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Add to cart
            </Link>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-neutral-200 bg-black p-8 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Live preview
              </p>
              <div className="mt-8 flex flex-col items-center gap-6">
                <PlatePreview
                  registration="A* 1"
                  style="3d-gel"
                  size="lg"
                  position="front"
                />
                <PlatePreview
                  registration="A* 1"
                  style="3d-gel"
                  size="lg"
                  position="rear"
                />
              </div>
              <p className="mt-8 text-center text-xs text-white/50">
                Preview is illustrative. The plate you receive is pressed to BS
                AU 145e where road legal.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
