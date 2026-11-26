import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0f1d36",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "#3866ff", display: "flex" }} />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#93b4ff", textTransform: "uppercase" }}>
            Integrações e automações empresariais
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            Seu ERP não precisa ser substituído. Precisa evoluir.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#c5d1e4" }}>
          Integrações · Automação · WhatsApp · Dashboards · Inteligência artificial
        </div>
      </div>
    ),
    size,
  );
}
