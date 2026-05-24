"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PlatePreview, { type PlateStyle } from "@/components/PlatePreview";
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
import { formatGBP, normalisePlateInput } from "@/lib/utils";

type Position = "front-only" | "rear-only" | "pair";

const POSITION_OPTIONS: { value: Position; label: string; desc: string }[] = [
  { value: "front-only", label: "Front only", desc: "Single white plate" },
  { value: "rear-only", label: "Rear only", desc: "Single yellow plate" },
  { value: "pair", label: "Front & rear", desc: "Pair (white + yellow)" },
];

function quantityFromPosition(position: Position): PlateQuantity {
  if (position === "pair") return "pair";
  if (position === "front-only") return "single-front";
  return "single-rear";
}

interface BuilderFormProps {
  initialStyleId?: string;
}

export default function BuilderForm({ initialStyleId }: BuilderFormProps) {
  const defaultProduct: PlateProduct =
    PLATE_PRODUCTS.find((p) => p.id === initialStyleId) ??
    PLATE_PRODUCTS.find((p) => p.id === "3d-gel") ??
    PLATE_PRODUCTS[0];

  const [reg, setReg] = useState<string>("");
  const [styleId, setStyleId] = useState<PlateStyle>(
    defaultProduct.id as PlateStyle,
  );
  const [position, setPosition] = useState<Position>("pair");
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

  const product = useMemo(
    () => PLATE_PRODUCTS.find((p) => p.id === styleId) ?? defaultProduct,
    [styleId, defaultProduct],
  );

  const cleanReg = useMemo(() => normalisePlateInput(reg), [reg]);
  const displayReg = cleanReg.length > 0 ? cleanReg : "AB12 CDE";
  const isPlaceholder = cleanReg.length === 0;

  const selectedAccessories: SelectedAccessory[] = useMemo(
    () =>
      ACCESSORY_LIST.filter((a) => accessoryState[a.id]?.selected).map((a) => ({
        id: a.id,
        quantity: accessoryState[a.id].quantity,
      })),
    [accessoryState],
  );

  const cartLines: CartLine[] = useMemo(
    () => [
      {
        productId: product.id,
        qty: quantityFromPosition(position),
      },
    ],
    [product.id, position],
  );

  const summary = useMemo(
    () => calculateCartTotal(cartLines, selectedAccessories),
    [cartLines, selectedAccessories],
  );

  const cartHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("style", product.id);
    params.set("position", position);
    if (cleanReg) params.set("reg", cleanReg);
    selectedAccessories.forEach((a) => {
      params.set(a.id, String(a.quantity));
    });
    return `/cart?${params.toString()}`;
  }, [product.id, position, cleanReg, selectedAccessories]);

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

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
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
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            placeholder="AB12 CDE"
            maxLength={9}
            spellCheck={false}
            autoComplete="off"
            inputMode="text"
            className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-lg uppercase tracking-[0.2em] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
          />
          <p className="mt-2 text-xs text-neutral-500">
            Letters, numbers and a single space (e.g. <span className="font-mono">FE34 THY</span>).
            Max 8 characters.
          </p>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-neutral-800">
            Finish
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {PLATE_PRODUCTS.map((p) => {
              const checked = styleId === p.id;
              return (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    checked
                      ? "border-neutral-900 bg-neutral-900/[0.04] ring-2 ring-neutral-900/10"
                      : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="finish"
                    value={p.id}
                    checked={checked}
                    onChange={() => setStyleId(p.id as PlateStyle)}
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
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-neutral-800">
            Plates
          </legend>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {POSITION_OPTIONS.map((opt) => {
              const checked = position === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer flex-col rounded-xl border p-4 transition ${
                    checked
                      ? "border-neutral-900 bg-neutral-900/[0.04] ring-2 ring-neutral-900/10"
                      : "border-neutral-200 bg-neutral-50 hover:border-neutral-900/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="position"
                    value={opt.value}
                    checked={checked}
                    onChange={() => setPosition(opt.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold text-neutral-900">
                    {opt.label}
                  </span>
                  <span className="mt-1 text-xs text-neutral-500">
                    {opt.desc}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-neutral-800">
            Size
          </legend>
          <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            UK standard oblong — 520 × 111mm.
            <span className="block text-xs text-neutral-500">
              Square, motorbike and custom show sizes available on request.
            </span>
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-neutral-800">
            Accessories
          </legend>
          <div className="mt-3 grid gap-3">
            {ACCESSORY_LIST.map((a) => {
              const state = accessoryState[a.id];
              return (
                <div
                  key={a.id}
                  className={`flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                    state.selected
                      ? "border-neutral-900 bg-neutral-900/[0.04]"
                      : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  <label className="flex flex-1 cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={state.selected}
                      onChange={() => toggleAccessory(a.id)}
                      className="mt-1 h-4 w-4 accent-neutral-900"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900">
                        {a.shortName} — {formatGBP(a.pricePence)}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {a.description}
                      </p>
                      <p className="mt-1 text-[11px] text-neutral-500">
                        {a.helpText}
                      </p>
                    </div>
                  </label>
                  {state.selected && (
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        aria-label={`Decrease ${a.shortName} quantity`}
                        onClick={() => setAccessoryQty(a.id, state.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-md border border-neutral-300 text-neutral-700 transition hover:border-neutral-900"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-neutral-900">
                        {state.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${a.shortName} quantity`}
                        onClick={() => setAccessoryQty(a.id, state.quantity + 1)}
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
        </fieldset>

        {product.roadLegal ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong className="font-semibold">Document verification required.</strong>{" "}
            Road legal plates only enter production after we verify your ID and
            entitlement to the registration.{" "}
            <Link
              href="/documents-required"
              className="underline underline-offset-2"
            >
              What you&apos;ll need
            </Link>
            .
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <strong className="font-semibold">Not road legal.</strong> Show
            plates are off-road / display only and must not be fitted to a
            vehicle driven on a public road. No documents required.
          </div>
        )}

        <Link
          href={cartHref}
          className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Add to cart — {formatGBP(summary.total)}
        </Link>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
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

          <div className="mt-6 flex flex-col items-center gap-6">
            {position !== "rear-only" && (
              <PlatePreview
                registration={displayReg}
                style={styleId}
                size="lg"
                position="front"
                showPositionLabel={position === "pair"}
                showLegalWarning={styleId === "show"}
              />
            )}
            {position !== "front-only" && (
              <PlatePreview
                registration={displayReg}
                style={styleId}
                size="lg"
                position="rear"
                showPositionLabel={position === "pair"}
                showLegalWarning={styleId === "show"}
              />
            )}
          </div>

          <dl className="mt-8 space-y-2 border-t border-white/10 pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/60">
                {product.shortName} ·{" "}
                {position === "pair"
                  ? "Pair"
                  : position === "front-only"
                    ? "Single front"
                    : "Single rear"}
              </dt>
              <dd className="font-medium">
                {formatGBP(summary.plateSubtotal)}
              </dd>
            </div>
            {selectedAccessories.map((a) => {
              const accessory = ACCESSORY_LIST.find((x) => x.id === a.id);
              if (!accessory) return null;
              return (
                <div key={a.id} className="flex justify-between">
                  <dt className="text-white/60">
                    {accessory.shortName} × {a.quantity}
                  </dt>
                  <dd className="font-medium">
                    {formatGBP(accessory.pricePence * a.quantity)}
                  </dd>
                </div>
              );
            })}
            <div className="flex justify-between text-white/60">
              <dt>Delivery</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base">
              <dt className="font-semibold text-white">Total</dt>
              <dd className="font-semibold text-[#d4af37]">
                {formatGBP(summary.total)}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-center text-[11px] text-white/40">
            Free next-day delivery on orders placed before 11am Mon–Sat.
          </p>
        </div>
      </aside>
    </div>
  );
}
