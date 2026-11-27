import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/brand/logo-light.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={siteConfig.name} width={271} height={60} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#93b4ff", textTransform: "uppercase" }}>
            Desenvolvimento de software e integrações
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            Integramos seus sistemas. Automatizamos seus processos.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#c5d1e4" }}>
          Integração de sistemas · Software sob medida · APIs · Automação · ERP
        </div>
      </div>
    ),
    size,
  );
}
