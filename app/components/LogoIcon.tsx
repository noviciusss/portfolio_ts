"use client";

export default function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} select-none`}
      fill="none"
      stroke="currentColor"
      strokeWidth="13"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* S Monogram Rounded Path */}
      <path d="M75 24 H25 V50 H75 V76 H25" />
      {/* Phosphor Green Dot endpoint at bottom left */}
      <circle cx="25" cy="76" r="9.5" fill="var(--phosphor, #7FE08A)" stroke="none" />
    </svg>
  );
}
