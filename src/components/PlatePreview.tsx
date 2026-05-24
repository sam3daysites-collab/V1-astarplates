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
}

const SIZE_CLASSES: Record<NonNullable<PlatePreviewProps["size"]>, string> = {
  sm: "h-14 text-2xl px-4",
  md: "h-20 text-4xl px-5",
  lg: "h-28 text-6xl px-7",
};

const BASE_BG: Record<PlateStyle, string> = {
  "standard-2d": "bg-yellow-300",
  "3d-gel": "bg-yellow-300",
  "4d": "bg-yellow-300",
  "4d-gel": "bg-yellow-300",
  show: "bg-white",
};

const FRONT_BG: Record<PlateStyle, string> = {
  "standard-2d": "bg-white",
  "3d-gel": "bg-white",
  "4d": "bg-white",
  "4d-gel": "bg-white",
  show: "bg-white",
};

const CHAR_STYLE: Record<PlateStyle, string> = {
  "standard-2d": "text-black drop-shadow-none",
  "3d-gel":
    "text-black [text-shadow:_0_2px_0_rgba(0,0,0,0.55),0_3px_3px_rgba(0,0,0,0.35)]",
  "4d": "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.7)]",
  "4d-gel":
    "text-black [text-shadow:_2px_2px_0_rgba(0,0,0,0.55),0_3px_4px_rgba(0,0,0,0.4)]",
  show: "text-black",
};

export default function PlatePreview({
  registration,
  style = "standard-2d",
  position = "front",
  className,
  size = "md",
}: PlatePreviewProps) {
  const display = (registration || "YOUR REG").toUpperCase();
  const bg =
    style === "show"
      ? "bg-white"
      : position === "front"
        ? FRONT_BG[style]
        : BASE_BG[style];

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-md border-2 border-black/80 font-mono font-bold tracking-[0.18em] shadow-[0_8px_22px_-12px_rgba(0,0,0,0.55)] select-none",
        bg,
        SIZE_CLASSES[size],
        CHAR_STYLE[style],
        className,
      )}
      aria-label={`Preview of plate ${display}`}
    >
      <span className="absolute inset-y-0 left-1 flex w-5 flex-col items-center justify-center rounded-l-sm bg-blue-700 text-[0.55rem] font-semibold leading-tight text-yellow-300">
        <span>UK</span>
      </span>
      <span className="pl-6">{display}</span>
    </div>
  );
}
