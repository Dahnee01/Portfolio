"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  glow?: boolean;
}

export function Input({
  label,
  glow = true,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
        className={cn(
          "peer w-full rounded-lg bg-[var(--input-bg)] px-4 pt-6 pb-2 text-text-primary outline-none transition-all duration-300",
          "border border-border",
          glow &&
            isFocused &&
            "border-accent/50 shadow-[0_0_15px_var(--glow-sm)]",
          !isFocused && "hover:border-border-hover",
          className
        )}
        placeholder=" "
      />
      <label
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none",
          isFocused || hasValue
            ? "top-2 text-xs text-accent-text"
            : "top-4 text-sm text-text-tertiary"
        )}
      >
        {label}
      </label>
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  glow?: boolean;
}

export function Textarea({
  label,
  glow = true,
  className,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <textarea
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
        className={cn(
          "peer w-full rounded-lg bg-[var(--input-bg)] px-4 pt-6 pb-2 text-text-primary outline-none transition-all duration-300 min-h-[120px] resize-none",
          "border border-border",
          glow &&
            isFocused &&
            "border-accent/50 shadow-[0_0_15px_var(--glow-sm)]",
          !isFocused && "hover:border-border-hover",
          className
        )}
        placeholder=" "
      />
      <label
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none",
          isFocused || hasValue
            ? "top-2 text-xs text-accent-text"
            : "top-4 text-sm text-text-tertiary"
        )}
      >
        {label}
      </label>
    </div>
  );
}
