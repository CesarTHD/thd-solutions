import Script from "next/script";
import { trackingConfig, trackingMode } from "@/config/tracking";
import { CONSENT_STORAGE_KEY } from "@/lib/tracking/consent";

/**
 * Carrega GTM ou gtag.js com Google Consent Mode v2.
 * A ordem é garantida dentro de um único script inline:
 *   1. consentimento padrão (negado);
 *   2. reaplica a escolha salva do visitante, se houver;
 *   3. carrega GTM (preferencial) ou gtag.js (modo direto).
 */
export function TrackingScripts() {
  if (trackingMode === "none") return null;

  const { gtmId, ga4Id, adsId } = trackingConfig;
  const gtagLoaderId = ga4Id || adsId;

  const code = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var c = JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}) || 'null');
  if (c && c.analytics) {
    gtag('consent', 'update', {
      analytics_storage: c.analytics,
      ad_storage: c.ads,
      ad_user_data: c.ads,
      ad_personalization: c.ads
    });
  }
} catch (e) {}
${
  trackingMode === "gtm"
    ? `(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
${
  // Tag do Google Ads ao lado do GTM: necessária para as conversões enviadas pelo site.
  adsId
    ? `(function(){var j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+${JSON.stringify(adsId)};document.head.appendChild(j);})();
gtag('js', new Date());
gtag('config', ${JSON.stringify(adsId)});`
    : ""
}`
    : `(function(){var j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+${JSON.stringify(gtagLoaderId)};document.head.appendChild(j);})();
gtag('js', new Date());
${ga4Id ? `gtag('config', ${JSON.stringify(ga4Id)});` : ""}
${adsId ? `gtag('config', ${JSON.stringify(adsId)});` : ""}`
}
`;

  return (
    <>
      <Script id="tracking-bootstrap" strategy="afterInteractive">
        {code}
      </Script>
      {trackingMode === "gtm" ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}
    </>
  );
}
