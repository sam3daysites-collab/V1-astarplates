import { cn } from "@/lib/utils";

export type PlateStyle =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "show";

export type PlatePosition = "front" | "rear";

interface PlatePreviewProps {
  registration: string;
  style?: PlateStyle;
  position?: PlatePosition;
  className?: string;
  size?: "sm" | "md" | "lg";
  showPositionLabel?: boolean;
  showLegalWarning?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<PlatePreviewProps["size"]>, string> = {
  sm: "h-12 text-xl px-3 sm:h-14 sm:text-2xl sm:px-4",
  md: "h-16 text-3xl px-4 sm:h-20 sm:text-4xl sm:px-5",
  lg: "h-20 text-3xl px-4 sm:h-24 sm:text-5xl sm:px-6 md:h-28 md:text-6xl md:px-7",
};

const CHAR_STYLE: Record<PlateStyle, string> = {
  "standard-2d": "text-black",
  "3d-gel":
    "text-black [text-shadow:_0_2px_0_rgba(0,0,0,0.55),0_3px_3px_rgba(0,0,0,0.35)]",
  "4d": "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.7)]",
  "4d-gel":
    "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.55),0_3px_4px_rgba(0,0,0,0.4)]",
  show: "text-black",
};

// Display a UK plate. Front plate is white, rear plate is yellow.
// Show plates follow the same convention so a "pair" preview shows the realistic
// front+rear pairing — they are not somehow exempt from the white/yellow split.
export default function PlatePreview({
  registration,
  style = "standard-2d",
  position = "front",
  className,
  size = "md",
  showPositionLabel = false,
  showLegalWarning = false,
}: PlatePreviewProps) {
  const display = (registration || "AB12 CDE").toUpperCase();
  const bg = position === "front" ? "bg-white" : "bg-yellow-300";

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
        <span className="absolute inset-y-0 left-1 flex w-5 flex-col items-center justify-center rounded-l-sm bg-blue-700 text-[0.55rem] font-semibold leading-tight text-yellow-300">
          <span>UK</span>
        </span>
        <span className="pl-6">{display}</span>
      </div>
      {showLegalWarning && style === "show" && (
        <span className="mt-1 inline-flex items-center justify-center rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Not Road Legal
        </span>
      )}
    </div>
  );
}
