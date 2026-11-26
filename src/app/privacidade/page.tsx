import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como ${siteConfig.name} trata dados pessoais e cookies nesta página.`,
  alternates: { canonical: "/privacidade" },
};

/**
 * Modelo de política de privacidade alinhado à LGPD (Lei 13.709/2018).
 * Revise com sua assessoria jurídica e complete os dados do controlador.
 */
export default function PrivacyPage() {
  const { name, contact } = siteConfig;
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1 bg-white">
        <Container className="max-w-3xl py-16 sm:py-20">
          <p className="eyebrow">Transparência</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Política de Privacidade</h1>
          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-slate-600 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-navy-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            <section>
              <h2>1. Sobre esta política</h2>
              <p>
                Esta política explica como {name} trata informações durante sua visita a esta página, em conformidade
                com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2>2. Formulário e WhatsApp</h2>
              <p>
                As informações preenchidas no formulário (nome, empresa, WhatsApp, ERP utilizado e descrição) não são
                enviadas nem armazenadas por esta página. Elas são usadas somente para montar uma mensagem que é
                aberta no WhatsApp do seu próprio dispositivo. O envio só acontece se você confirmar a mensagem no
                aplicativo. A partir daí, a conversa segue as políticas do WhatsApp e é tratada por nossa equipe
                comercial exclusivamente para responder à sua solicitação.
              </p>
            </section>

            <section>
              <h2>3. Cookies e tecnologias de medição</h2>
              <p>Com o seu consentimento, podemos utilizar:</p>
              <ul>
                <li>
                  <strong className="text-navy-900">Análise</strong>: Google Analytics, para entender como a página é
                  utilizada de forma agregada.
                </li>
                <li>
                  <strong className="text-navy-900">Publicidade</strong>: Google Ads e Google Tag Manager, para medir o
                  desempenho de campanhas e a origem das visitas (parâmetros como utm_source e gclid).
                </li>
              </ul>
              <p className="mt-3">
                Sem consentimento, essas ferramentas operam em modo restrito, sem gravar cookies de análise ou
                publicidade. Nenhum dado pessoal digitado no formulário é enviado a essas ferramentas.
              </p>
            </section>

            <section>
              <h2>4. Armazenamento local</h2>
              <p>
                Guardamos no seu navegador a sua escolha sobre cookies e, durante a visita, a origem da campanha que
                trouxe você até aqui. A origem só é mantida entre visitas (por até 90 dias) se você autorizar cookies
                de publicidade.
              </p>
            </section>

            <section>
              <h2>5. Seus direitos</h2>
              <p>
                Você pode, a qualquer momento, solicitar acesso, correção ou exclusão de seus dados pessoais tratados
                em conversas com nossa equipe, além de revogar o consentimento de cookies limpando os dados do site no
                seu navegador.
              </p>
            </section>

            <section>
              <h2>6. Contato</h2>
              <p>
                Para assuntos relacionados à privacidade, entre em contato
                {contact.email ? (
                  <>
                    {" "}
                    pelo e-mail{" "}
                    <a className="font-medium text-electric-600 underline" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </>
                ) : (
                  " pelos nossos canais comerciais"
                )}
                .
              </p>
            </section>

            <p className="border-t border-slate-200 pt-6">
              <Link href="/" className="font-medium text-electric-600 underline underline-offset-2">
                Voltar para a página inicial
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
