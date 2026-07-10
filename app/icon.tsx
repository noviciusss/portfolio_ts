import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#EDEBE4",
          padding: "5px",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: "85%", height: "85%" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M75 24 H25 V50 H75 V76 H25" />
          <circle cx="25" cy="76" r="9.5" fill="#7FE08A" stroke="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
