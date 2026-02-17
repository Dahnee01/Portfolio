import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hoverable?: boolean;
}

export function Card({
  children,
  className,
  glass = true,
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        glass && "glass",
        hoverable &&
          "transition-transform duration-300 hover:scale-[1.03]",
        className
      )}
    >
      {children}
    </div>
  );
}
