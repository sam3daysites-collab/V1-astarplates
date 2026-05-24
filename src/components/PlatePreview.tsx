import { cn } from "@/lib/utils";

export type PlateStyle =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "show";

export type PlatePosition = "front" | "rear";

export type PlateFlag = "UK" | "GB" | "ENG" | "SCO" | "CYM" | "none";

interface PlatePreviewProps {
  registration: string;
  style?: PlateStyle;
  position?: PlatePosition;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  flag?: PlateFlag;
  showPositionLabel?: boolean;
  showLegalWarning?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<PlatePreviewProps["size"]>, string> = {
  sm: "h-12 text-xl px-3 sm:h-14 sm:text-2xl sm:px-4",
  md: "h-16 text-3xl px-4 sm:h-20 sm:text-4xl sm:px-5",
  lg: "h-20 text-3xl px-4 sm:h-24 sm:text-5xl sm:px-6 md:h-28 md:text-6xl md:px-7",
  xl: "h-24 text-4xl px-5 sm:h-28 sm:text-5xl sm:px-7 md:h-32 md:text-7xl md:px-8",
};

const CHAR_STYLE: Record<PlateStyle, string> = {
  "standard-2d": "text-black",
  "3d-gel":
    "text-black [text-shadow:_0_2px_0_rgba(0,0,0,0.55),0_3px_3px_rgba(0,0,0,0.35)]",
  "4d": "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.85)]",
  "4d-gel":
    "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.7),0_4px_5px_rgba(0,0,0,0.45)]",
  show: "text-black",
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

// Front plate is always white, rear plate is always yellow — show plates
// are not exempt. A "pair" preview always renders one of each.
export default function PlatePreview({
  registration,
  style = "standard-2d",
  position = "front",
  className,
  size = "md",
  flag = "UK",
  showPositionLabel = false,
  showLegalWarning = false,
}: PlatePreviewProps) {
  const display = (registration || "AB12 CDE").toUpperCase();
  const bg = position === "front" ? "bg-white" : "bg-yellow-300";
  const flagStyle = flag === "none" ? null : FLAG_STYLES[flag];

  return (
    <div className={cn("inline-flex flex-col items-stretch gap-1", className)}>
      {showPositionLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
          {position === "front" ? "Front" : "Rear"}
        </span>
      )}
      <div
        className={cn(
          "relative inline-flex items-center justify-center rounded-md border-2 border-black/80 font-mono font-bold tracking-[0.18em] shadow-[0_8px_22px_-12px_rgba(0,0,0,0.55)] select-none",
          bg,
          SIZE_CLASSES[size],
          CHAR_STYLE[style],
        )}
        aria-label={`Preview of ${position} plate ${display}`}
      >
        {flagStyle && (
          <span
            className={cn(
              "absolute inset-y-0 left-1 flex w-5 flex-col items-center justify-center rounded-l-sm text-[0.55rem] font-semibold leading-tight",
              flagStyle.bg,
              flagStyle.fg,
            )}
          >
            <span>{flagStyle.text}</span>
          </span>
        )}
        <span className={flagStyle ? "pl-6" : ""}>{display}</span>
      </div>
      {showLegalWarning && style === "show" && (
        <span className="mt-1 inline-flex items-center justify-center rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Not Road Legal
        </span>
      )}
    </div>
  );
}
