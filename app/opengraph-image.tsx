import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Samarth Pratap Singh — AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0D0C",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#EDEBE4",
          border: "12px solid #111111",
        }}
      >
        {/* Top header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#7FE08A",
              color: "#0B0D0C",
              padding: "8px 20px",
              fontSize: "20px",
              fontWeight: 900,
              letterSpacing: "2px",
              textTransform: "uppercase",
              border: "3px solid #EDEBE4",
              boxShadow: "6px 6px 0 0 #EDEBE4",
            }}
          >
            AI Engineer · 2027 Roles
          </div>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#FFC53D",
              fontWeight: 700,
            }}
          >
            portfolio-noviciusss.vercel.app
          </div>
        </div>

        {/* Main Title Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Samarth Pratap Singh
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9B9990",
              fontWeight: 600,
            }}
          >
            LLM Agents · RAG Systems · Evaluation Harnesses · FastMCP
          </div>
        </div>

        {/* 3 Metric Tiles in Signal Block style */}
        <div style={{ display: "flex", gap: "24px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#161817",
              border: "3px solid #EDEBE4",
              boxShadow: "6px 6px 0 0 #7FE08A",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#7FE08A",
              }}
            >
              89.2%
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#9B9990",
                marginTop: "4px",
              }}
            >
              Correctness · 40-Q Eval (DoCopilot)
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#161817",
              border: "3px solid #EDEBE4",
              boxShadow: "6px 6px 0 0 #FFC53D",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#FFC53D",
              }}
            >
              7m → 90s
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#9B9990",
                marginTop: "4px",
              }}
            >
              PDF Extraction, 20p (Internship Project)
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#161817",
              border: "3px solid #EDEBE4",
              boxShadow: "6px 6px 0 0 #7FE08A",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#EDEBE4",
              }}
            >
              92%
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#9B9990",
                marginTop: "4px",
              }}
            >
              Pass Rate · 50 Cases (ContextCore)
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
