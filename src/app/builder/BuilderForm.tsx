"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PlatePreview, {
  type PlateFlag,
  type PlateStyle,
} from "@/components/PlatePreview";
import {
  ACCESSORY_LIST,
  type AccessoryId,
  type SelectedAccessory,
} from "@/lib/accessories";
import { PLATE_PRODUCTS, type PlateProduct } from "@/lib/products";
import {
  calculateCartTotal,
  type CartLine,
  type PlateQuantity,
} from "@/lib/pricing";
import { DELIVERY } from "@/lib/policies";
import { formatGBP, normalisePlateInput } from "@/lib/utils";

type StepId =
  | "reg"
  | "style"
  | "type"
  | "size"
  | "flag"
  | "extras"
  | "review";

const STEPS: { id: StepId; label: string }[] = [
  { id: "reg", label: "Reg" },
  { id: "style", label: "Style" },
  { id: "type", label: "Plate Type" },
  { id: "size", label: "Size" },
  { id: "flag", label: "Flag" },
  { id: "extras", label: "Extras" },
  { id: "review", label: "Review" },
];

type PlateType = "pair" | "front-only" | "rear-only";

const PLATE_TYPE_OPTIONS: {
  id: PlateType;
  label: string;
  sub: string;
  recommended?: boolean;
}[] = [
  {
    id: "pair",
    label: "Front & Rear Pair",
    sub: "Reflective white front + reflective yellow rear",
    recommended: true,
  },
  {
    id: "front-only",
    label: "Front Only",
    sub: "Single white plate",
  },
  {
    id: "rear-only",
    label: "Rear Only",
    sub: "Single yellow plate",
  },
];

// V1 ships with one customer-selectable size. Custom sizes go through support
// until pricing and fulfilment are confirmed — see SIZE_NOTE below.
const STANDARD_SIZE = {
  id: "standard" as const,
  label: "Standard UK Car Plate",
  dimensions: "520 × 111mm",
  note: "The default plate fitted to almost every UK road car.",
};

const SIZE_CONTACT_NOTE =
  "Need a short, import, motorcycle or custom size? Contact us before ordering so we can confirm fitment.";

const FLAG_OPTIONS: { id: PlateFlag; label: string; sub: string }[] = [
  { id: "none", label: "No flag", sub: "Blank left side. Default." },
  { id: "UK", label: "UK", sub: "Current identifier (post-2021)" },
  { id: "GB", label: "GB", sub: "Pre-2021 identifier, still permitted" },
  { id: "ENG", label: "ENG", sub: "England" },
  { id: "SCO", label: "SCO", sub: "Scotland" },
  { id: "CYM", label: "CYM", sub: "Wales / Cymru" },
];

function plateTypeToQuantity(t: PlateType): PlateQuantity {
  if (t === "pair") return "pair";
  if (t === "front-only") return "single-front";
  return "single-rear";
}

function frontIncluded(t: PlateType) {
  return t !== "rear-only";
}
function rearIncluded(t: PlateType) {
  return t !== "front-only";
}

interface BuilderFormProps {
  initialStyleId?: string;
}

export default function BuilderForm({ initialStyleId }: BuilderFormProps) {
  const defaultProduct: PlateProduct =
    PLATE_PRODUCTS.find((p) => p.id === initialStyleId) ??
    PLATE_PRODUCTS.find((p) => p.id === "3d-gel") ??
    PLATE_PRODUCTS[0];

  const [stepIndex, setStepIndex] = useState(0);
  const [reg, setReg] = useState("");
  const [styleId, setStyleId] = useState<PlateStyle>(
    defaultProduct.id as PlateStyle,
  );
  const [plateType, setPlateType] = useState<PlateType>("pair");
  const [flag, setFlag] = useState<PlateFlag>("none");
  const [accessoryState, setAccessoryState] = useState<
    Record<AccessoryId, { selected: boolean; quantity: number }>
  >(() =>
    ACCESSORY_LIST.reduce(
      (acc, a) => {
        acc[a.id] = { selected: false, quantity: a.defaultQuantity };
        return acc;
      },
      {} as Record<AccessoryId, { selected: boolean; quantity: number }>,
    ),
  );
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const product = useMemo(
    () => PLATE_PRODUCTS.find((p) => p.id === styleId) ?? defaultProduct,
    [styleId, defaultProduct],
  );

  const cleanReg = useMemo(() => normalisePlateInput(reg), [reg]);
  const isPlaceholder = cleanReg.length === 0;
  const displayReg = isPlaceholder ? "AB12 CDE" : cleanReg;

  const selectedAccessories: SelectedAccessory[] = useMemo(
    () =>
      ACCESSORY_LIST.filter((a) => accessoryState[a.id]?.selected).map((a) => ({
        id: a.id,
        quantity: accessoryState[a.id].quantity,
      })),
    [accessoryState],
  );

  const cartLines: CartLine[] = useMemo(
    () => [{ productId: product.id, qty: plateTypeToQuantity(plateType) }],
    [product.id, plateType],
  );

  const summary = useMemo(
    () => calculateCartTotal(cartLines, selectedAccessories),
    [cartLines, selectedAccessories],
  );

  const cartHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("style", product.id);
    params.set("plateType", plateType);
    params.set("size", STANDARD_SIZE.id);
    params.set("flag", flag);
    if (cleanReg) params.set("reg", cleanReg);
    selectedAccessories.forEach((a) => {
      params.set(a.id, String(a.quantity));
    });
    return `/cart?${params.toString()}`;
  }, [product.id, plateType, flag, cleanReg, selectedAccessories]);

  function toggleAccessory(id: AccessoryId) {
    setAccessoryState((s) => ({
      ...s,
      [id]: { ...s[id], selected: !s[id].selected },
    }));
  }

  function setAccessoryQty(id: AccessoryId, qty: number) {
    setAccessoryState((s) => ({
      ...s,
      [id]: { ...s[id], quantity: Math.max(1, Math.min(qty, 5)) },
    }));
  }

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const isFirstStep = stepIndex === 0;

  return (
    <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
      <div className="space-y-8 lg:pr-2">
        <StepNav
          current={stepIndex}
          steps={STEPS}
          onSelect={(idx) => setStepIndex(idx)}
        />

        <PreviewPanel
          displayReg={displayReg}
          isPlaceholder={isPlaceholder}
          styleId={styleId}
          flag={flag}
          plateType={plateType}
        />

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          {currentStep.id === "reg" && (
            <RegStep value={reg} onChange={setReg} cleanReg={cleanReg} />
          )}
          {currentStep.id === "style" && (
            <StyleStep value={styleId} onSelect={setStyleId} />
          )}
          {currentStep.id === "type" && (
            <PlateTypeStep value={plateType} onSelect={setPlateType} />
          )}
          {currentStep.id === "size" && <SizeStep />}
          {currentStep.id === "flag" && (
            <FlagStep value={flag} onSelect={setFlag} />
          )}
          {currentStep.id === "extras" && (
            <ExtrasStep
              state={accessoryState}
              onToggle={toggleAccessory}
              onQty={setAccessoryQty}
            />
          )}
          {currentStep.id === "review" && (
            <ReviewStep
              displayReg={displayReg}
              isPlaceholder={isPlaceholder}
              product={product}
              plateType={plateType}
              flag={flag}
              selectedAccessories={selectedAccessories}
              summary={summary}
            />
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled={isFirstStep}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            {isLastStep ? (
              <Link
                href={cartHref}
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                Add configured plate to cart — {formatGBP(summary.total)}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))
                }
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {product.roadLegal ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong className="font-semibold">Document verification required.</strong>{" "}
            Road legal plates only enter production after we verify your ID and
            entitlement.{" "}
            <Link href="/documents-required" className="underline underline-offset-2">
              What you&apos;ll need
            </Link>
            .
          </p>
        ) : (
          <p className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <strong className="font-semibold">Not road legal.</strong> Show
            plates are display only and must not be fitted to a vehicle driven
            on a public road. No documents required.
          </p>
        )}
      </div>

      {/* Desktop sticky summary */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <SummaryCard
            displayReg={displayReg}
            isPlaceholder={isPlaceholder}
            product={product}
            plateType={plateType}
            flag={flag}
            selectedAccessories={selectedAccessories}
            summary={summary}
            cartHref={cartHref}
          />
        </div>
      </aside>

      {/* Mobile sticky bottom bar + collapsible summary */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.4)] lg:hidden">
        {mobileSummaryOpen && (
          <div className="max-h-[60vh] overflow-y-auto border-b border-neutral-200 px-4 py-4">
            <SummaryCard
              displayReg={displayReg}
              isPlaceholder={isPlaceholder}
              product={product}
              plateType={plateType}
              flag={flag}
              selectedAccessories={selectedAccessories}
              summary={summary}
              cartHref={cartHref}
              compact
            />
          </div>
        )}
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen((v) => !v)}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {mobileSummaryOpen ? "Hide summary" : "Show summary"}
            </span>
            <span className="text-sm font-semibold text-neutral-900">
              {formatGBP(summary.total)}
            </span>
          </button>
          <Link
            href={cartHref}
            className="inline-flex flex-1 items-center justify-center rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Add to cart
          </Link>
        </div>
      </div>

      {/* Spacer so content doesn't sit under the fixed mobile bar */}
      <div aria-hidden className="h-24 lg:hidden" />
    </div>
  );
}

/* -------------------------- step nav -------------------------- */

function StepNav({
  current,
  steps,
  onSelect,
}: {
  current: number;
  steps: { id: StepId; label: string }[];
  onSelect: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Builder steps"
      className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0"
    >
      <ol className="flex min-w-max items-center gap-2 sm:gap-3">
        {steps.map((step, idx) => {
          const isActive = idx === current;
          const isDone = idx < current;
          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onSelect(idx)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : isDone
                      ? "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-900"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold ${
                    isActive
                      ? "bg-white text-neutral-900"
                      : isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {isDone ? "✓" : idx + 1}
                </span>
                {step.label}
              </button>
              {idx < steps.length - 1 && (
                <span aria-hidden className="h-px w-4 bg-neutral-300 sm:w-6" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------- preview -------------------------- */

function PreviewPanel({
  displayReg,
  isPlaceholder,
  styleId,
  flag,
  plateType,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  styleId: PlateStyle;
  flag: PlateFlag;
  plateType: PlateType;
}) {
  const showLegal = styleId === "show";
  const showFront = frontIncluded(plateType);
  const showRear = rearIncluded(plateType);
  return (
    <div className="rounded-3xl border border-neutral-200 bg-black p-6 text-white sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Live preview
        </p>
        {isPlaceholder && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Example reg
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        {showFront && (
          <PlatePreview
            registration={displayReg}
            style={styleId}
            flag={flag}
            size="lg"
            position="front"
            showPositionLabel={plateType === "pair"}
            showLegalWarning={showLegal}
          />
        )}
        {showRear && (
          <PlatePreview
            registration={displayReg}
            style={styleId}
            flag={flag}
            size="lg"
            position="rear"
            showPositionLabel={plateType === "pair"}
            showLegalWarning={showLegal}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------- summary -------------------------- */

function plateTypeLabel(t: PlateType) {
  return PLATE_TYPE_OPTIONS.find((o) => o.id === t)?.label ?? t;
}

function SummaryCard({
  displayReg,
  isPlaceholder,
  product,
  plateType,
  flag,
  selectedAccessories,
  summary,
  cartHref,
  compact = false,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  product: PlateProduct;
  plateType: PlateType;
  flag: PlateFlag;
  selectedAccessories: SelectedAccessory[];
  summary: ReturnType<typeof calculateCartTotal>;
  cartHref: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white shadow-sm ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Order summary
      </p>

      <dl className="mt-4 space-y-3 text-sm">
        <SummaryRow label="Registration">
          <span className="font-mono">{displayReg}</span>
          {isPlaceholder && (
            <span className="ml-1 text-[11px] text-neutral-500">
              (example)
            </span>
          )}
        </SummaryRow>
        <SummaryRow label="Style">
          {product.shortName}
          {!product.roadLegal && (
            <span className="ml-2 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
              Show only
            </span>
          )}
        </SummaryRow>
        <SummaryRow label="Plate type">{plateTypeLabel(plateType)}</SummaryRow>
        <SummaryRow label="Size">
          {STANDARD_SIZE.label}
          <span className="block text-[11px] text-neutral-500">
            {STANDARD_SIZE.dimensions}
          </span>
        </SummaryRow>
        <SummaryRow label="Flag">
          {flag === "none" ? "No flag" : flag}
        </SummaryRow>
        <SummaryRow label="Add-ons">
          {selectedAccessories.length === 0 ? (
            <span className="text-neutral-500">None</span>
          ) : (
            <ul className="space-y-0.5">
              {selectedAccessories.map((a) => {
                const accessory = ACCESSORY_LIST.find((x) => x.id === a.id);
                if (!accessory) return null;
                return (
                  <li
                    key={a.id}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <span>
                      {accessory.shortName} × {a.quantity}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {formatGBP(accessory.pricePence * a.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </SummaryRow>
      </dl>

      <div className="mt-5 space-y-2 border-t border-neutral-200 pt-4 text-sm">
        <Line label="Plate" value={formatGBP(summary.plateSubtotal)} />
        {summary.accessorySubtotal > 0 && (
          <Line label="Add-ons" value={formatGBP(summary.accessorySubtotal)} />
        )}
        <Line label="Delivery" value={DELIVERY.freeBadge} />
        <Line label="Total" value={formatGBP(summary.total)} emphasis />
      </div>

      <p className="mt-3 text-[11px] text-neutral-500">
        {DELIVERY.headline} — {DELIVERY.subheadline.toLowerCase()}.
      </p>

      {!compact && (
        <Link
          href={cartHref}
          className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Add configured plate to cart
        </Link>
      )}
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </dt>
      <dd className="text-right text-sm text-neutral-900">{children}</dd>
    </div>
  );
}

function Line({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        emphasis
          ? "border-t border-neutral-200 pt-3 text-base font-semibold text-neutral-900"
          : "text-neutral-700"
      }`}
    >
      <span>{label}</span>
      <span
        className={emphasis ? "text-neutral-900" : "font-medium text-neutral-900"}
      >
        {value}
      </span>
    </div>
  );
}

/* -------------------------- steps -------------------------- */

function RegStep({
  value,
  onChange,
  cleanReg,
}: {
  value: string;
  onChange: (v: string) => void;
  cleanReg: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Your registration</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Type the exact reg you want on the plate. The preview updates live.
      </p>
      <label htmlFor="reg" className="mt-6 block text-sm font-medium text-neutral-800">
        Registration
      </label>
      <input
        id="reg"
        name="reg"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="AB12 CDE"
        maxLength={9}
        spellCheck={false}
        autoComplete="off"
        inputMode="text"
        className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-xl uppercase tracking-[0.2em] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
      />
      <p className="mt-2 text-xs text-neutral-500">
        Letters, numbers and a single space (e.g.{" "}
        <span className="font-mono">FE34 THY</span>). Max 8 characters.
      </p>
      {cleanReg && cleanReg !== value.toUpperCase().trim() && (
        <p className="mt-2 text-xs text-neutral-500">
          We&apos;ll press{" "}
          <span className="font-mono font-semibold text-neutral-900">
            {cleanReg}
          </span>
          .
        </p>
      )}
    </div>
  );
}

function StyleStep({
  value,
  onSelect,
}: {
  value: PlateStyle;
  onSelect: (id: PlateStyle) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Choose a style</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Four road legal finishes plus show plates. Pricing updates in your
        summary.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLATE_PRODUCTS.map((p) => {
          const checked = value === p.id;
          return (
            <label
              key={p.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-neutral-900 bg-neutral-900/[0.04] ring-2 ring-neutral-900/10"
                  : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
            >
              <input
                type="radio"
                name="style"
                value={p.id}
                checked={checked}
                onChange={() => onSelect(p.id as PlateStyle)}
                className="mt-1 h-4 w-4 accent-neutral-900"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  {p.shortName}
                </p>
                <p className="text-xs text-neutral-600">{p.tagline}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  From {formatGBP(p.singlePence)} ·{" "}
                  {p.roadLegal ? (
                    <span className="text-emerald-700">Road legal</span>
                  ) : (
                    <span className="text-red-700">Show only — not road legal</span>
                  )}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PlateTypeStep({
  value,
  onSelect,
}: {
  value: PlateType;
  onSelect: (id: PlateType) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Plate type</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Most customers order a pair. Pick just one if you only need to replace a
        single plate.
      </p>
      <div className="mt-6 grid gap-3">
        {PLATE_TYPE_OPTIONS.map((opt) => {
          const checked = value === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-neutral-900 bg-neutral-900/[0.04] ring-2 ring-neutral-900/10"
                  : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
            >
              <input
                type="radio"
                name="plate-type"
                value={opt.id}
                checked={checked}
                onChange={() => onSelect(opt.id)}
                className="h-4 w-4 accent-neutral-900"
              />
              <div className="flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  {opt.label}
                  {opt.recommended && (
                    <span className="inline-flex rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6c1a]">
                      Recommended
                    </span>
                  )}
                </p>
                <p className="text-xs text-neutral-600">{opt.sub}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function SizeStep() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Plate size</h2>
      <p className="mt-1 text-sm text-neutral-600">
        We ship the UK standard size by default — it fits almost every road
        car.
      </p>
      <div className="mt-6 rounded-xl border border-neutral-900 bg-neutral-900/[0.04] p-4 ring-2 ring-neutral-900/10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {STANDARD_SIZE.label}
            </p>
            <p className="text-xs text-neutral-500">{STANDARD_SIZE.dimensions}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            Selected
          </span>
        </div>
        <p className="mt-3 text-xs text-neutral-600">{STANDARD_SIZE.note}</p>
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Need a different size?</p>
        <p className="mt-1">{SIZE_CONTACT_NOTE}</p>
        <Link
          href="/contact"
          className="mt-2 inline-block text-sm font-semibold text-amber-900 underline underline-offset-2"
        >
          Contact us →
        </Link>
      </div>
    </div>
  );
}

function FlagStep({
  value,
  onSelect,
}: {
  value: PlateFlag;
  onSelect: (id: PlateFlag) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Left-side flag</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Optional identifier strip on the left of the plate. Default is no flag
        — pick one if you want it.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {FLAG_OPTIONS.map((opt) => {
          const checked = value === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-neutral-900 bg-neutral-900/[0.04] ring-2 ring-neutral-900/10"
                  : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
            >
              <input
                type="radio"
                name="flag"
                value={opt.id}
                checked={checked}
                onChange={() => onSelect(opt.id)}
                className="mt-1 h-4 w-4 accent-neutral-900"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  {opt.label}
                </p>
                <p className="text-xs text-neutral-500">{opt.sub}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ExtrasStep({
  state,
  onToggle,
  onQty,
}: {
  state: Record<AccessoryId, { selected: boolean; quantity: number }>;
  onToggle: (id: AccessoryId) => void;
  onQty: (id: AccessoryId, qty: number) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Add-ons</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Optional accessories for fitting your plates. All add-ons ship with the
        order — no separate delivery.
      </p>
      <div className="mt-6 grid gap-3">
        {ACCESSORY_LIST.map((a) => {
          const s = state[a.id];
          return (
            <div
              key={a.id}
              className={`flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                s.selected
                  ? "border-neutral-900 bg-neutral-900/[0.04]"
                  : "border-neutral-200 bg-neutral-50"
              }`}
            >
              <label className="flex flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={s.selected}
                  onChange={() => onToggle(a.id)}
                  className="mt-1 h-4 w-4 accent-neutral-900"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {a.shortName} — {formatGBP(a.pricePence)}
                  </p>
                  <p className="text-xs text-neutral-600">{a.description}</p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {a.helpText}
                  </p>
                </div>
              </label>
              {s.selected && (
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    aria-label={`Decrease ${a.shortName} quantity`}
                    onClick={() => onQty(a.id, s.quantity - 1)}
                    className="grid h-8 w-8 place-items-center rounded-md border border-neutral-300 text-neutral-700 transition hover:border-neutral-900"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-neutral-900">
                    {s.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${a.shortName} quantity`}
                    onClick={() => onQty(a.id, s.quantity + 1)}
                    className="grid h-8 w-8 place-items-center rounded-md border border-neutral-300 text-neutral-700 transition hover:border-neutral-900"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewStep({
  displayReg,
  isPlaceholder,
  product,
  plateType,
  flag,
  selectedAccessories,
  summary,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  product: PlateProduct;
  plateType: PlateType;
  flag: PlateFlag;
  selectedAccessories: SelectedAccessory[];
  summary: ReturnType<typeof calculateCartTotal>;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Review your plate</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Double-check the details below, then add the configured plate to your
        cart.
      </p>

      <dl className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-50">
        <ReviewRow label="Registration">
          <span className="font-mono">{displayReg}</span>
          {isPlaceholder && (
            <span className="ml-1 text-xs text-neutral-500">(example — type yours in step 1)</span>
          )}
        </ReviewRow>
        <ReviewRow label="Style">
          {product.name}
          {!product.roadLegal && (
            <span className="ml-2 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
              Show only
            </span>
          )}
        </ReviewRow>
        <ReviewRow label="Plate type">{plateTypeLabel(plateType)}</ReviewRow>
        <ReviewRow label="Size">
          {STANDARD_SIZE.label} · {STANDARD_SIZE.dimensions}
        </ReviewRow>
        <ReviewRow label="Flag">
          {flag === "none" ? "No flag" : flag}
        </ReviewRow>
        <ReviewRow label="Add-ons">
          {selectedAccessories.length === 0
            ? "None"
            : selectedAccessories
                .map((a) => {
                  const accessory = ACCESSORY_LIST.find((x) => x.id === a.id);
                  return accessory ? `${accessory.shortName} × ${a.quantity}` : null;
                })
                .filter(Boolean)
                .join(", ")}
        </ReviewRow>
        <ReviewRow label="Delivery">Free — {DELIVERY.serviceName}</ReviewRow>
        <ReviewRow label="Total">
          <span className="text-base font-semibold text-neutral-900">
            {formatGBP(summary.total)}
          </span>
        </ReviewRow>
      </dl>

      {product.roadLegal && (
        <p className="mt-4 text-xs text-neutral-500">
          You&apos;ll upload your ID and entitlement documents during checkout.
        </p>
      )}
    </div>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <dt className="text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </dt>
      <dd className="text-right text-sm text-neutral-900">{children}</dd>
    </div>
  );
}
