import { cn } from "@/lib/utils";

export type PlateStyle =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "4d-retro";

export type PlatePosition = "front" | "rear";
export type PlateMode = "road-legal" | "show";

export type PlateFlag = "UK" | "GB" | "ENG" | "SCO" | "CYM" | "none";

interface PlatePreviewProps {
  registration: string;
  style?: PlateStyle;
  position?: PlatePosition;
  mode?: PlateMode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  flag?: PlateFlag;
  showCountryCode?: string; // ISO α-2 for show-mode flag chip
  showCountryName?: string;
  showPositionLabel?: boolean;
  supplierPostcode?: string;
  compact?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<PlatePreviewProps["size"]>, string> = {
  sm: "h-12 text-2xl px-3 sm:h-14 sm:text-3xl sm:px-4",
  md: "h-16 text-4xl px-4 sm:h-20 sm:text-5xl sm:px-5",
  lg: "h-20 text-5xl px-4 sm:h-24 sm:text-6xl sm:px-6 md:h-28 md:text-7xl md:px-7",
  xl: "h-24 text-6xl px-5 sm:h-28 sm:text-7xl sm:px-7 md:h-32 md:text-[5rem] md:px-8",
};

// Calmer shadows at small sizes (cleaner text), full depth at lg/xl.
const STYLE_CHARS: Record<PlateStyle, string> = {
  "standard-2d": "text-black",
  "3d-gel":
    "text-black [text-shadow:_0_1px_0_rgba(0,0,0,0.55),0_2px_2px_rgba(0,0,0,0.3)]",
  "4d":
    "text-black [text-shadow:_1px_1px_0_rgba(0,0,0,0.9),2px_2px_0_rgba(0,0,0,0.55)]",
  "4d-gel":
    "text-black [text-shadow:_1px_1px_0_rgba(0,0,0,0.75),0_3px_4px_rgba(0,0,0,0.35)]",
  "4d-retro":
    "text-black [-webkit-text-stroke:0.4px_#4a4a4a] [text-shadow:_-0.5px_-0.5px_0_rgba(255,255,255,0.55),1px_1px_0_#1a1a1a,2px_2px_0_#000,3px_3px_3px_rgba(0,0,0,0.45)]",
};

const STYLE_CHARS_LG: Record<PlateStyle, string> = {
  "standard-2d": "text-black",
  "3d-gel":
    "text-black [text-shadow:_0_2px_0_rgba(0,0,0,0.55),0_3px_3px_rgba(0,0,0,0.35)]",
  "4d":
    "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.9),3px_3px_0_rgba(0,0,0,0.55)]",
  "4d-gel":
    "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.75),0_4px_5px_rgba(0,0,0,0.4)]",
  "4d-retro":
    "text-black [-webkit-text-stroke:0.75px_#525252] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.6),1px_1px_0_#181818,2px_2px_0_#000,3px_3px_0_#000,4px_4px_5px_rgba(0,0,0,0.45)]",
};

const FLAG_STYLES: Record<
  Exclude<PlateFlag, "none">,
  { bg: string; fg: string; text: string }
> = {
  UK: { bg: "bg-blue-700", fg: "text-yellow-300", text: "UK" },
  GB: { bg: "bg-blue-700", fg: "text-yellow-300", text: "GB" },
  ENG: { bg: "bg-red-700", fg: "text-white", text: "ENG" },
  SCO: { bg: "bg-blue-900", fg: "text-white", text: "SCO" },
  CYM: { bg: "bg-green-700", fg: "text-white", text: "CYM" },
};

// Front plate is always reflective white. Rear plate is always reflective
// yellow. Show plates use the same colour split — they are not exempt.
export default function PlatePreview({
  registration,
  style = "standard-2d",
  position = "front",
  mode = "road-legal",
  className,
  size = "md",
  flag = "none",
  showCountryCode,
  showCountryName,
  showPositionLabel = false,
  supplierPostcode = "EN4 8DH",
  compact = false,
}: PlatePreviewProps) {
  const display = (registration || "AB12 CDE").toUpperCase();
  const bg = position === "front" ? "bg-white" : "bg-[#ffcc00]";
  const isShow = mode === "show";
  const isLarge = size === "lg" || size === "xl";
  const styleClass = isLarge ? STYLE_CHARS_LG[style] : STYLE_CHARS[style];

  // In show mode, prefer the chosen country chip; otherwise fall back to the
  // road-legal identifier (UK/GB/ENG/SCO/CYM/none).
  const renderShowFlag = isShow && !!showCountryCode;
  const renderLegalFlag = !isShow && flag !== "none";
  const legalFlagStyle = renderLegalFlag ? FLAG_STYLES[flag as Exclude<PlateFlag, "none">] : null;

  return (
    <div className={cn("inline-flex flex-col items-stretch gap-1", className)}>
      {showPositionLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
          {position === "front" ? "Front" : "Rear"}
        </span>
      )}
      <div
        className={cn(
          "font-plate relative inline-flex items-center justify-center rounded-md border-2 border-black/80 font-bold tracking-[0.08em] shadow-[0_8px_22px_-12px_rgba(0,0,0,0.55)] select-none",
          bg,
          SIZE_CLASSES[size],
          styleClass,
        )}
        aria-label={`Preview of ${position} ${isShow ? "show" : "road legal"} plate ${display}`}
      >
        {legalFlagStyle && (
          <span
            className={cn(
              "absolute inset-y-0 left-1 flex w-5 flex-col items-center justify-center rounded-l-sm text-[0.55rem] font-semibold leading-tight",
              legalFlagStyle.bg,
              legalFlagStyle.fg,
            )}
          >
            <span>{legalFlagStyle.text}</span>
          </span>
        )}
        {renderShowFlag && (
          <span
            title={showCountryName ?? showCountryCode}
            className="absolute inset-y-1 left-1 flex w-7 flex-col items-center justify-center rounded-l-sm bg-neutral-900 text-[0.6rem] font-semibold leading-tight text-white"
          >
            {showCountryCode}
          </span>
        )}
        <span className={renderShowFlag ? "pl-8" : legalFlagStyle ? "pl-6" : ""}>
          {display}
        </span>

        {/* Road-legal supplier mark + BS AU 145e (only on non-compact) */}
        {!compact && !isShow && (
          <>
            <span className="pointer-events-none absolute bottom-0.5 left-0 right-0 hidden text-center text-[7px] font-medium tracking-[0.2em] text-black/40 sm:block">
              A★ NUMBER PLATES · {supplierPostcode}
            </span>
            <span className="pointer-events-none absolute right-1.5 top-0.5 hidden text-[7px] font-medium text-black/40 sm:block">
              BS AU 145e
            </span>
          </>
        )}
      </div>
      {isShow && (
        <span className="mt-1 inline-flex items-center justify-center rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Not Road Legal
        </span>
      )}
    </div>
  );
}
