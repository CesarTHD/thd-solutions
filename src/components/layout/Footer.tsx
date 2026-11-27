import Link from "next/link";
import { formatWhatsAppDisplay, siteConfig } from "@/config/site";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const phone = formatWhatsAppDisplay();
  const { email } = siteConfig.contact;
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-navy-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-relaxed text-navy-300">{siteConfig.shortDescription}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Serviços</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-300 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="text-navy-300 transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Contato comercial</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <WhatsAppCta
                origin="footer"
                location="footer"
                buttonId="footer_whatsapp"
                className="text-navy-300 transition-colors hover:text-white"
              >
                WhatsApp{phone ? `: ${phone}` : ""}
              </WhatsAppCta>
            </li>
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="text-navy-300 transition-colors hover:text-white">
                  {email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/privacidade" className="text-navy-300 transition-colors hover:text-white">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-navy-800/80">
        <Container className="py-6 text-xs text-navy-400">
          © {year} {siteConfig.name}. Todos os direitos reservados.
        </Container>
      </div>
    </footer>
  );
}
