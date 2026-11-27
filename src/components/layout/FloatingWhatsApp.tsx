import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <WhatsAppCta
      origin="floating"
      location="botao_flutuante"
      buttonId="floating_whatsapp"
      aria-label="Conversar pelo WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-13 items-center justify-center rounded-full bg-whatsapp-600 text-white shadow-[0_8px_24px_-6px_rgba(17,107,51,0.55)] transition-[scale,background-color] duration-200 ease-out hover:scale-105 active:scale-95 hover:bg-whatsapp-700 sm:right-6 sm:bottom-6 lg:size-12"
    >
      <WhatsAppIcon className="size-6" />
    </WhatsAppCta>
  );
}
