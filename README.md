# Landing Page: Integrações e Soluções Complementares para ERP

Landing page para campanhas de Google Ads. Vende integrações, automações e funcionalidades complementares para ERPs que as empresas já usam. Todos os CTAs comerciais levam ao WhatsApp.

**Stack:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 e Lucide React. Não há backend nem banco de dados. Todas as rotas são pré-renderizadas como estáticas.

## Executar localmente

Requer Node.js 20.9 ou superior.

```bash
npm install
cp .env.example .env.local   # ajuste o número do WhatsApp e os demais valores
npm run dev                  # http://localhost:3000
```

| Script | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Gera os tipos de rota e roda o `tsc` |
| `npm run lint` | ESLint |
| `npm run check` | typecheck + lint |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build (respeita a variável `PORT`) |

## Variáveis de ambiente

Todas estão documentadas em [.env.example](.env.example).

> Variáveis `NEXT_PUBLIC_*` são **embutidas no momento do build**. Se alterar alguma, gere um novo build ou faça um novo deploy.

| Variável | Obrigatória | Uso |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número comercial, só dígitos (ex.: `5511999999999`) |
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | URL pública final: canonical, Open Graph, sitemap e robots |
| `NEXT_PUBLIC_COMPANY_NAME` | Recomendado | Nome da empresa (o padrão é um placeholder) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não | E-mail exibido no footer e na política de privacidade |
| `NEXT_PUBLIC_GTM_ID` | Não | Google Tag Manager (modo recomendado) |
| `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_*_LABEL` | Não | Modo direto, sem GTM |
| `NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION` | Não | Acrescenta a origem da campanha à mensagem do WhatsApp |

A configuração do rastreamento está em **[docs/TRACKING.md](docs/TRACKING.md)**: eventos, parâmetros, GTM, consentimento e conversões offline.

## Estrutura

```
src/
  app/                    rotas, layout, metadata, sitemap, robots, ícone, imagem OG
    privacidade/          política de privacidade (modelo LGPD)
  config/
    site.ts               nome, contatos, navegação, SEO
    tracking.ts           IDs de rastreamento e modo (gtm | gtag | none)
  content/
    landing.ts            todos os textos comerciais (dores, soluções, projetos, FAQ...)
  components/
    layout/               Header, Footer, Logo, botão flutuante do WhatsApp
    sections/             uma seção da página por arquivo
    forms/                formulário de qualificação
    cta/                  WhatsAppCta (link + evento)
    mockups/              mockups ilustrativos dos projetos
    analytics/            scripts de tags, banner de consentimento, captura de UTMs
    ui/                   Container, SectionHeading, Accordion, ícones
  lib/
    whatsapp.ts           construção de URLs e mensagens por origem
    lead-validation.ts    validação e máscara do formulário
    tracking/             consentimento, atribuição e eventos
```

## Personalização

- **Textos**: [src/content/landing.ts](src/content/landing.ts).
- **Mensagens do WhatsApp por origem**: `whatsappMessages` em [src/lib/whatsapp.ts](src/lib/whatsapp.ts).
- **Cores**: tokens `navy`, `electric` e `whatsapp` em [src/app/globals.css](src/app/globals.css).
- **Logotipo**: [src/components/layout/Logo.tsx](src/components/layout/Logo.tsx) e [src/app/icon.svg](src/app/icon.svg).
- **Screenshots reais dos projetos**: coloque as imagens em `public/projetos/` e preencha o campo `image` do projeto em `landing.ts`. Exemplo:
  ```ts
  image: { src: "/projetos/fidelizacao.png", alt: "Tela de segmentação de clientes", width: 1600, height: 1000 }
  ```
  Enquanto o campo estiver vazio, a página exibe um mockup marcado como "Interface ilustrativa".
- **Política de privacidade**: [src/app/privacidade/page.tsx](src/app/privacidade/page.tsx) é um modelo. Revise com a assessoria jurídica.

## Deploy na Railway

1. Suba o projeto para um repositório no GitHub.
2. Na Railway, clique em **New Project → Deploy from GitHub repo** e selecione o repositório.
3. Em **Variables**, cadastre as variáveis do `.env.example`. No mínimo: `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_COMPANY_NAME`. A Railway disponibiliza as variáveis do serviço durante o build, que é quando os valores `NEXT_PUBLIC_*` são embutidos.
4. O arquivo [railway.json](railway.json) já define o build (`npm run build`), o start (`npm run start`) e o healthcheck em `/`. A Railway injeta `PORT`, que o `next start` usa automaticamente.
5. Em **Settings → Networking**, gere um domínio ou conecte o domínio próprio. Depois atualize `NEXT_PUBLIC_SITE_URL` e faça um novo deploy.

## Checklist antes de publicar

- [ ] Número do WhatsApp real configurado
- [ ] `NEXT_PUBLIC_SITE_URL` com o domínio final
- [ ] Nome da empresa e logotipo definidos
- [ ] GTM configurado e testado no Preview (ver docs/TRACKING.md)
- [ ] `lead_form_submit` como conversão principal e cliques como secundárias no Google Ads
- [ ] Política de privacidade revisada
- [ ] Screenshots reais dos projetos (opcional)
