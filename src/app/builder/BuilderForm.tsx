"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PlatePreview, {
  type PlateFlag,
  type PlateStyle,
} from "@/components/PlatePreview";
import {
  ACCESSORY_LIST,
  defaultStripPacks,
  fixingKitPenceFor,
  type AccessoryId,
  type SelectedAccessory,
} from "@/lib/accessories";
import { PLATE_PRODUCTS, type PlateProduct } from "@/lib/products";
import {
  calculateCartTotal,
  SHOW_FLAG_FEE_PENCE,
  type CartLine,
  type PlateMode,
  type PlateQuantity,
} from "@/lib/pricing";
import {
  DEFAULT_SIZE_ID,
  PLATE_SIZES,
  positionAllowsSize,
  type PlatePosition,
  type PlateSize,
} from "@/lib/sizes";
import { COUNTRIES, findCountry } from "@/lib/countries";
import { DELIVERY } from "@/lib/policies";
import { formatGBP, normalisePlateInput } from "@/lib/utils";

type StepId =
  | "reg"
  | "mode"
  | "style"
  | "type"
  | "size"
  | "flag"
  | "extras"
  | "review";

const STEPS_ROAD_LEGAL: { id: StepId; label: string }[] = [
  { id: "reg", label: "Reg" },
  { id: "mode", label: "Mode" },
  { id: "style", label: "Style" },
  { id: "type", label: "Plate Type" },
  { id: "size", label: "Size" },
  { id: "flag", label: "Flag" },
  { id: "extras", label: "Extras" },
  { id: "review", label: "Review" },
];

const PLATE_TYPE_OPTIONS: {
  id: PlatePosition;
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
    sub: "Single reflective white plate",
  },
  {
    id: "rear-only",
    label: "Rear Only",
    sub: "Single reflective yellow plate",
  },
];

const ROAD_LEGAL_FLAG_OPTIONS: { id: PlateFlag; label: string; sub: string }[] = [
  { id: "none", label: "No flag", sub: "Blank left side. Default." },
  { id: "UK", label: "UK", sub: "Current identifier (post-2021)" },
  { id: "GB", label: "GB", sub: "Pre-2021 identifier, still permitted" },
  { id: "ENG", label: "ENG", sub: "England" },
  { id: "SCO", label: "SCO", sub: "Scotland" },
  { id: "CYM", label: "CYM", sub: "Wales / Cymru" },
];

function plateTypeToQuantity(t: PlatePosition): PlateQuantity {
  if (t === "pair") return "pair";
  if (t === "front-only") return "single-front";
  return "single-rear";
}

function frontIncluded(t: PlatePosition) {
  return t !== "rear-only";
}
function rearIncluded(t: PlatePosition) {
  return t !== "front-only";
}

function validateReg(
  raw: string,
  mode: PlateMode,
  size: PlateSize,
): string | null {
  const clean = normalisePlateInput(raw);
  if (clean.length === 0) return "Please enter a registration";
  const noSpaces = clean.replace(/\s/g, "");
  if (mode === "road-legal") {
    if (!/^[A-Z0-9 ]+$/.test(clean)) return "Only letters and numbers allowed";
    if (noSpaces.length > size.roadLegalMaxChars) {
      return `Road legal ${size.label.toLowerCase()} plates support up to ${size.roadLegalMaxChars} characters`;
    }
  } else {
    if (noSpaces.length > 10) {
      return "Maximum 10 characters for show plates (excluding spaces)";
    }
    if (clean.length > 12) {
      return "Maximum 12 characters total";
    }
  }
  return null;
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
  const [mode, setMode] = useState<PlateMode>("road-legal");
  const [styleId, setStyleId] = useState<PlateStyle>(
    defaultProduct.id as PlateStyle,
  );
  const [plateType, setPlateType] = useState<PlatePosition>("pair");
  const [sizeId, setSizeId] = useState<string>(DEFAULT_SIZE_ID);
  const [flag, setFlag] = useState<PlateFlag>("none");
  const [flagCountry, setFlagCountry] = useState<string>("");
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

  const size = useMemo(
    () => PLATE_SIZES.find((s) => s.id === sizeId) ?? PLATE_SIZES[0],
    [sizeId],
  );

  const cleanReg = useMemo(() => normalisePlateInput(reg), [reg]);
  const isPlaceholder = cleanReg.length === 0;
  const displayReg = isPlaceholder ? "AB12 CDE" : cleanReg;
  const regError = useMemo(
    () => (reg.length === 0 ? null : validateReg(reg, mode, size)),
    [reg, mode, size],
  );

  // If the chosen plate-type isn't compatible with the size, snap to a valid type.
  const safePlateType = useMemo<PlatePosition>(() => {
    if (positionAllowsSize(plateType, size)) return plateType;
    if (size.allowedPositions.includes("front")) return "front-only";
    if (size.allowedPositions.includes("rear")) return "rear-only";
    return "pair";
  }, [plateType, size]);

  // Adjust default strip pack count to match position.
  const stripsDefault = defaultStripPacks(safePlateType);

  const selectedAccessories: SelectedAccessory[] = useMemo(
    () =>
      ACCESSORY_LIST.filter((a) => accessoryState[a.id]?.selected).map((a) => {
        const qty =
          a.id === "adhesive-strips" &&
          accessoryState[a.id].quantity === a.defaultQuantity
            ? stripsDefault
            : accessoryState[a.id].quantity;
        return { id: a.id, quantity: qty };
      }),
    [accessoryState, stripsDefault],
  );

  const cartLines: CartLine[] = useMemo(
    () => [
      {
        productId: product.id,
        qty: plateTypeToQuantity(safePlateType),
        mode,
        flagCountryCode: mode === "show" ? flagCountry || undefined : undefined,
      },
    ],
    [product.id, safePlateType, mode, flagCountry],
  );

  const summary = useMemo(
    () => calculateCartTotal(cartLines, selectedAccessories),
    [cartLines, selectedAccessories],
  );

  const cartHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("style", product.id);
    params.set("mode", mode);
    params.set("plateType", safePlateType);
    params.set("size", sizeId);
    if (mode === "road-legal") {
      params.set("flag", flag);
    } else if (flagCountry) {
      params.set("country", flagCountry);
    }
    if (cleanReg) params.set("reg", cleanReg);
    selectedAccessories.forEach((a) => {
      params.set(a.id, String(a.quantity));
    });
    return `/cart?${params.toString()}`;
  }, [
    product.id,
    mode,
    safePlateType,
    sizeId,
    flag,
    flagCountry,
    cleanReg,
    selectedAccessories,
  ]);

  function toggleAccessory(id: AccessoryId) {
    setAccessoryState((s) => ({
      ...s,
      [id]: { ...s[id], selected: !s[id].selected },
    }));
  }

  function setAccessoryQty(id: AccessoryId, qty: number) {
    setAccessoryState((s) => ({
      ...s,
      [id]: {
        ...s[id],
        quantity: Math.max(1, Math.min(qty, 10)),
      },
    }));
  }

  const STEPS = STEPS_ROAD_LEGAL;
  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const isFirstStep = stepIndex === 0;
  const canAddToCart = !regError; // requires a valid (non-empty) reg

  return (
    <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
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
          mode={mode}
          flag={flag}
          countryCode={flagCountry}
          countryName={findCountry(flagCountry)?.name}
          plateType={safePlateType}
        />

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          {currentStep.id === "reg" && (
            <RegStep
              value={reg}
              onChange={setReg}
              cleanReg={cleanReg}
              error={regError}
              mode={mode}
              size={size}
            />
          )}
          {currentStep.id === "mode" && (
            <ModeStep value={mode} onSelect={setMode} />
          )}
          {currentStep.id === "style" && (
            <StyleStep value={styleId} onSelect={setStyleId} />
          )}
          {currentStep.id === "type" && (
            <PlateTypeStep
              value={safePlateType}
              size={size}
              onSelect={setPlateType}
            />
          )}
          {currentStep.id === "size" && (
            <SizeStep
              value={sizeId}
              plateType={safePlateType}
              onSelect={setSizeId}
            />
          )}
          {currentStep.id === "flag" && (
            <FlagStep
              mode={mode}
              roadLegalValue={flag}
              onRoadLegalSelect={setFlag}
              showValue={flagCountry}
              onShowSelect={setFlagCountry}
            />
          )}
          {currentStep.id === "extras" && (
            <ExtrasStep
              plateType={safePlateType}
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
              mode={mode}
              plateType={safePlateType}
              size={size}
              flag={flag}
              countryCode={flagCountry}
              selectedAccessories={selectedAccessories}
              summary={summary}
              regError={regError}
            />
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled={isFirstStep}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            {isLastStep ? (
              <Link
                href={canAddToCart ? cartHref : "#"}
                aria-disabled={!canAddToCart}
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition ${
                  canAddToCart
                    ? "bg-[var(--brand-lime)] hover:bg-[var(--brand-lime-hover)]"
                    : "pointer-events-none bg-neutral-400"
                }`}
              >
                Add configured plate to cart — {formatGBP(summary.total)}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))
                }
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {mode === "road-legal" ? (
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
            mode={mode}
            plateType={safePlateType}
            size={size}
            flag={flag}
            countryCode={flagCountry}
            selectedAccessories={selectedAccessories}
            summary={summary}
            cartHref={cartHref}
            canAddToCart={canAddToCart}
          />
        </div>
      </aside>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.4)] lg:hidden">
        {mobileSummaryOpen && (
          <div className="max-h-[60vh] overflow-y-auto border-b border-neutral-200 px-4 py-4">
            <SummaryCard
              displayReg={displayReg}
              isPlaceholder={isPlaceholder}
              product={product}
              mode={mode}
              plateType={safePlateType}
              size={size}
              flag={flag}
              countryCode={flagCountry}
              selectedAccessories={selectedAccessories}
              summary={summary}
              cartHref={cartHref}
              canAddToCart={canAddToCart}
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
            href={canAddToCart ? cartHref : "#"}
            aria-disabled={!canAddToCart}
            className={`inline-flex flex-1 items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${
              canAddToCart
                ? "bg-[var(--brand-lime)]"
                : "pointer-events-none bg-neutral-400"
            }`}
          >
            Add to cart
          </Link>
        </div>
      </div>
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
                    ? "border-[var(--brand-lime)] bg-[var(--brand-lime)] text-white"
                    : isDone
                      ? "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-900"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold ${
                    isActive
                      ? "bg-white text-[var(--brand-lime)]"
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
  mode,
  flag,
  countryCode,
  countryName,
  plateType,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  styleId: PlateStyle;
  mode: PlateMode;
  flag: PlateFlag;
  countryCode: string;
  countryName?: string;
  plateType: PlatePosition;
}) {
  const showFront = frontIncluded(plateType);
  const showRear = rearIncluded(plateType);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-[var(--brand-lime)] p-6 text-white sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Live preview
        </p>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              mode === "show"
                ? "bg-red-500/20 text-red-200 ring-1 ring-red-400/40"
                : "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40"
            }`}
          >
            {mode === "show" ? "Show" : "Road legal"}
          </span>
          {isPlaceholder && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Example reg
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        {showFront && (
          <PlatePreview
            registration={displayReg}
            style={styleId}
            mode={mode}
            flag={flag}
            showCountryCode={countryCode || undefined}
            showCountryName={countryName}
            size="lg"
            position="front"
            showPositionLabel={plateType === "pair"}
          />
        )}
        {showRear && (
          <PlatePreview
            registration={displayReg}
            style={styleId}
            mode={mode}
            flag={flag}
            showCountryCode={countryCode || undefined}
            showCountryName={countryName}
            size="lg"
            position="rear"
            showPositionLabel={plateType === "pair"}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------- summary -------------------------- */

function plateTypeLabel(t: PlatePosition) {
  return PLATE_TYPE_OPTIONS.find((o) => o.id === t)?.label ?? t;
}

function SummaryCard({
  displayReg,
  isPlaceholder,
  product,
  mode,
  plateType,
  size,
  flag,
  countryCode,
  selectedAccessories,
  summary,
  cartHref,
  canAddToCart,
  compact = false,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  product: PlateProduct;
  mode: PlateMode;
  plateType: PlatePosition;
  size: PlateSize;
  flag: PlateFlag;
  countryCode: string;
  selectedAccessories: SelectedAccessory[];
  summary: ReturnType<typeof calculateCartTotal>;
  cartHref: string;
  canAddToCart: boolean;
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
            <span className="ml-1 text-[11px] text-neutral-500">(example)</span>
          )}
        </SummaryRow>
        <SummaryRow label="Mode">
          {mode === "show" ? (
            <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
              Show — not road legal
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
              Road legal
            </span>
          )}
        </SummaryRow>
        <SummaryRow label="Style">{product.shortName}</SummaryRow>
        <SummaryRow label="Plate type">{plateTypeLabel(plateType)}</SummaryRow>
        <SummaryRow label="Size">
          {size.label}
          <span className="block text-[11px] text-neutral-500">
            {size.dimensions}
          </span>
        </SummaryRow>
        <SummaryRow label="Flag">
          {mode === "show"
            ? findCountry(countryCode)?.name ?? "No country"
            : flag === "none"
              ? "No flag"
              : flag}
          {mode === "show" && countryCode && (
            <span className="block text-[11px] text-neutral-500">
              +{formatGBP(SHOW_FLAG_FEE_PENCE)} per plate
            </span>
          )}
        </SummaryRow>
        <SummaryRow label="Add-ons">
          {selectedAccessories.length === 0 ? (
            <span className="text-neutral-500">None</span>
          ) : (
            <ul className="space-y-0.5">
              {selectedAccessories.map((a) => {
                const accessory = ACCESSORY_LIST.find((x) => x.id === a.id);
                if (!accessory) return null;
                const lineTotal = accessory.positionPriced
                  ? fixingKitPenceFor(plateType)
                  : accessory.pricePence * a.quantity;
                return (
                  <li
                    key={a.id}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <span>
                      {accessory.shortName}
                      {!accessory.positionPriced && ` × ${a.quantity}`}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {formatGBP(lineTotal)}
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
        {summary.flagSubtotal > 0 && (
          <Line label="Flag" value={formatGBP(summary.flagSubtotal)} />
        )}
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
          href={canAddToCart ? cartHref : "#"}
          aria-disabled={!canAddToCart}
          className={`mt-5 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
            canAddToCart
              ? "bg-[var(--brand-lime)] hover:bg-[var(--brand-lime-hover)]"
              : "pointer-events-none bg-neutral-400"
          }`}
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
  error,
  mode,
  size,
}: {
  value: string;
  onChange: (v: string) => void;
  cleanReg: string;
  error: string | null;
  mode: PlateMode;
  size: PlateSize;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Your registration</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Type the exact reg you want on the plate. The preview updates live.
      </p>
      <label
        htmlFor="reg"
        className="mt-6 block text-sm font-medium text-neutral-800"
      >
        Registration
      </label>
      <input
        id="reg"
        name="reg"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="AB12 CDE"
        maxLength={12}
        spellCheck={false}
        autoCapitalize="characters"
        autoCorrect="off"
        autoComplete="off"
        inputMode="text"
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 font-mono text-xl uppercase tracking-[0.2em] text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
            : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/10"
        }`}
      />
      {error ? (
        <p className="mt-2 text-xs font-medium text-red-700">{error}</p>
      ) : (
        <p className="mt-2 text-xs text-neutral-500">
          {mode === "road-legal"
            ? `Up to ${size.roadLegalMaxChars} characters on a ${size.label} plate.`
            : "Up to 10 characters (excluding spaces) on a show plate."}
        </p>
      )}
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

function ModeStep({
  value,
  onSelect,
}: {
  value: PlateMode;
  onSelect: (m: PlateMode) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Road Legal or Show?</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Choose Road Legal for daily driving (we verify your documents). Choose
        Show for display, off-road and private property — not road legal.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("road-legal")}
          className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
            value === "road-legal"
              ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05] ring-2 ring-[var(--brand-lime)]/15"
              : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
          }`}
        >
          <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            Road legal
          </span>
          <p className="mt-3 text-sm font-semibold text-neutral-900">
            BS AU 145e road legal
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            Charles Wright font, correct spacing, supplier mark — accepted at
            MOT. Document verification required.
          </p>
        </button>
        <button
          type="button"
          onClick={() => onSelect("show")}
          className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
            value === "show"
              ? "border-red-500 bg-red-50 ring-2 ring-red-400/30"
              : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
          }`}
        >
          <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
            Not road legal
          </span>
          <p className="mt-3 text-sm font-semibold text-neutral-900">
            Show / display plate
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            Custom spacing, optional country flag, no supplier markings. Off-road
            and private property use only. No documents required.
          </p>
        </button>
      </div>
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
        Five finishes — all road-legal capable and all available as show plates.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLATE_PRODUCTS.map((p) => {
          const checked = value === p.id;
          return (
            <label
              key={p.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05] ring-2 ring-[var(--brand-lime)]/15"
                  : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
            >
              <input
                type="radio"
                name="style"
                value={p.id}
                checked={checked}
                onChange={() => onSelect(p.id as PlateStyle)}
                className="mt-1 h-4 w-4 accent-[var(--brand-lime)]"
              />
              <div className="flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  {p.shortName}
                  {p.badge && (
                    <span className="inline-flex rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6c1a]">
                      {p.badge}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-neutral-600">{p.tagline}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  From {formatGBP(p.singlePence)} single ·{" "}
                  {formatGBP(p.pairPence)} pair
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
  size,
  onSelect,
}: {
  value: PlatePosition;
  size: PlateSize;
  onSelect: (id: PlatePosition) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Plate type</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Most customers order a pair. Pick just one to replace a single plate.
      </p>
      <div className="mt-6 grid gap-3">
        {PLATE_TYPE_OPTIONS.map((opt) => {
          const checked = value === opt.id;
          const disabled = !positionAllowsSize(opt.id, size);
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                disabled
                  ? "cursor-not-allowed border-neutral-200 bg-neutral-100/60 opacity-50"
                  : checked
                    ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05] ring-2 ring-[var(--brand-lime)]/15"
                    : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
              title={
                disabled
                  ? "Not available for the selected size"
                  : undefined
              }
            >
              <input
                type="radio"
                name="plate-type"
                value={opt.id}
                checked={checked}
                disabled={disabled}
                onChange={() => onSelect(opt.id)}
                className="h-4 w-4 accent-[var(--brand-lime)]"
              />
              <div className="flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  {opt.label}
                  {opt.recommended && (
                    <span className="inline-flex rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6c1a]">
                      Recommended
                    </span>
                  )}
                  {disabled && (
                    <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      Not available
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

function SizeStep({
  value,
  plateType,
  onSelect,
}: {
  value: string;
  plateType: PlatePosition;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Plate size</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Most cars take the Standard 520 × 111mm plate. Out-of-stock sizes are
        disabled.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLATE_SIZES.map((s) => {
          const isOut = s.stock === "out_of_stock";
          const isAllowed = positionAllowsSize(plateType, s);
          const disabled = isOut || !isAllowed;
          const checked = value === s.id;
          return (
            <button
              key={s.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(s.id)}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
                disabled
                  ? "cursor-not-allowed border-neutral-200 bg-neutral-100/60 opacity-50"
                  : checked
                    ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05] ring-2 ring-[var(--brand-lime)]/15"
                    : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
              title={
                isOut
                  ? "Currently out of stock"
                  : !isAllowed
                    ? "Not compatible with selected plate type"
                    : undefined
              }
            >
              <div className="flex w-full items-start justify-between gap-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {s.label}
                </p>
                {isOut && (
                  <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
                    Out of stock
                  </span>
                )}
                {!isOut && !isAllowed && (
                  <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Not for {plateType.replace("-", " ")}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500">{s.dimensions}</p>
              {s.note && (
                <p className="mt-1 text-[11px] text-neutral-500">{s.note}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlagStep({
  mode,
  roadLegalValue,
  onRoadLegalSelect,
  showValue,
  onShowSelect,
}: {
  mode: PlateMode;
  roadLegalValue: PlateFlag;
  onRoadLegalSelect: (id: PlateFlag) => void;
  showValue: string;
  onShowSelect: (code: string) => void;
}) {
  if (mode === "show") {
    return (
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          Country flag (show plates only)
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Show plates can carry any international identifier on the left strip.
          Adds {formatGBP(SHOW_FLAG_FEE_PENCE)} per plate when selected.
        </p>
        <div className="mt-6 grid gap-3">
          <label className="text-sm font-medium text-neutral-800">
            Country
            <select
              value={showValue}
              onChange={(e) => onShowSelect(e.target.value)}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            >
              <option value="">No country flag</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </label>
          {showValue && (
            <p className="text-xs text-neutral-500">
              Flag fee will apply per plate at checkout.
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Left-side flag</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Optional identifier strip on the left of road-legal plates. Default is
        no flag.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {ROAD_LEGAL_FLAG_OPTIONS.map((opt) => {
          const checked = roadLegalValue === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05] ring-2 ring-[var(--brand-lime)]/15"
                  : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
              }`}
            >
              <input
                type="radio"
                name="flag"
                value={opt.id}
                checked={checked}
                onChange={() => onRoadLegalSelect(opt.id)}
                className="mt-1 h-4 w-4 accent-[var(--brand-lime)]"
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
  plateType,
  state,
  onToggle,
  onQty,
}: {
  plateType: PlatePosition;
  state: Record<AccessoryId, { selected: boolean; quantity: number }>;
  onToggle: (id: AccessoryId) => void;
  onQty: (id: AccessoryId, qty: number) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Add-ons</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Optional fittings for your plates. All ship with the order.
      </p>
      <div className="mt-4 rounded-xl border border-[var(--brand-lime)]/30 bg-[var(--brand-lime)]/[0.04] p-3 text-xs text-[var(--brand-lime)]">
        <strong className="font-semibold">DVLA recommends</strong> adhesive
        strips over fixing kits for a cleaner finish.
      </div>
      <div className="mt-4 grid gap-3">
        {ACCESSORY_LIST.map((a) => {
          const s = state[a.id];
          const positional = a.positionPriced;
          const displayPrice = positional
            ? `${formatGBP(a.pricePence)}/plate (${formatGBP(fixingKitPenceFor(plateType))} for your selection)`
            : `${formatGBP(a.pricePence)}/pack of 4`;
          const minQty = a.id === "adhesive-strips" ? 1 : 1;
          return (
            <div
              key={a.id}
              className={`flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                s.selected
                  ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/[0.05]"
                  : "border-neutral-200 bg-neutral-50"
              }`}
            >
              <label className="flex flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={s.selected}
                  onChange={() => onToggle(a.id)}
                  className="mt-1 h-4 w-4 accent-[var(--brand-lime)]"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {a.shortName} — {displayPrice}
                  </p>
                  <p className="text-xs text-neutral-600">{a.description}</p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {a.helpText}
                  </p>
                  <p className="mt-1 text-[11px] italic text-neutral-500">
                    {a.tooltip}
                  </p>
                </div>
              </label>
              {s.selected && !positional && (
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    aria-label={`Decrease ${a.shortName} quantity`}
                    onClick={() => onQty(a.id, s.quantity - 1)}
                    disabled={s.quantity <= minQty}
                    className="grid h-8 w-8 place-items-center rounded-md border border-neutral-300 text-neutral-700 transition hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
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
  mode,
  plateType,
  size,
  flag,
  countryCode,
  selectedAccessories,
  summary,
  regError,
}: {
  displayReg: string;
  isPlaceholder: boolean;
  product: PlateProduct;
  mode: PlateMode;
  plateType: PlatePosition;
  size: PlateSize;
  flag: PlateFlag;
  countryCode: string;
  selectedAccessories: SelectedAccessory[];
  summary: ReturnType<typeof calculateCartTotal>;
  regError: string | null;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">Review your plate</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Check everything below, then add the configured plate to cart.
      </p>

      {regError && (
        <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {regError}
        </p>
      )}

      <dl className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-50">
        <ReviewRow label="Registration">
          <span className="font-mono">{displayReg}</span>
          {isPlaceholder && (
            <span className="ml-1 text-xs text-neutral-500">
              (example — type yours in step 1)
            </span>
          )}
        </ReviewRow>
        <ReviewRow label="Mode">
          {mode === "show" ? "Show plate (not road legal)" : "Road legal"}
        </ReviewRow>
        <ReviewRow label="Style">{product.name}</ReviewRow>
        <ReviewRow label="Plate type">{plateTypeLabel(plateType)}</ReviewRow>
        <ReviewRow label="Size">
          {size.label} · {size.dimensions}
        </ReviewRow>
        <ReviewRow label="Flag">
          {mode === "show"
            ? findCountry(countryCode)?.name ?? "No country flag"
            : flag === "none"
              ? "No flag"
              : flag}
        </ReviewRow>
        <ReviewRow label="Add-ons">
          {selectedAccessories.length === 0
            ? "None"
            : selectedAccessories
                .map((a) => {
                  const accessory = ACCESSORY_LIST.find((x) => x.id === a.id);
                  return accessory
                    ? `${accessory.shortName}${accessory.positionPriced ? "" : ` × ${a.quantity}`}`
                    : null;
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

      {mode === "road-legal" && (
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
