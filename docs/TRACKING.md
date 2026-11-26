# Rastreamento: GTM, GA4 e Google Ads

Este documento explica como a página mede conversões e como configurar as ferramentas do Google.

## 1. Como funciona

| Peça | Arquivo | O que faz |
|---|---|---|
| Carregamento das tags | `src/components/analytics/TrackingScripts.tsx` | Define o Consent Mode v2 (tudo negado por padrão), reaplica a escolha salva do visitante e carrega o GTM **ou** o gtag.js |
| Banner de consentimento | `src/components/analytics/ConsentBanner.tsx` | Aceitar / Recusar / Personalizar (Análise e Publicidade) |
| Consentimento | `src/lib/tracking/consent.ts` | Salva a escolha em `localStorage` (`lp_consent_v1`) e chama `gtag('consent','update')` |
| Atribuição | `src/lib/tracking/attribution.ts` | Captura `utm_*` e `gclid` da URL |
| Eventos | `src/lib/tracking/events.ts` | Envia os eventos ao `dataLayer` (GTM) ou ao `gtag` (modo direto) |

### Modos

- **GTM (recomendado)**: defina só `NEXT_PUBLIC_GTM_ID`. Os eventos vão para o `dataLayer` e você configura GA4 e Google Ads dentro do GTM.
- **Direto**: sem GTM, defina `NEXT_PUBLIC_GA4_ID` e/ou `NEXT_PUBLIC_GOOGLE_ADS_ID`. O gtag.js envia os eventos e, se houver rótulos configurados, as conversões do Ads.
- Com o GTM definido, o modo direto é ignorado. Isso evita contar cada hit duas vezes.

## 2. Eventos

Cada interação dispara **um único** evento. Cliques repetidos no mesmo botão dentro de 1,5 s são ignorados.

| Evento | Quando dispara | `intent_level` |
|---|---|---|
| `whatsapp_click` | CTAs gerais de WhatsApp (header, hero, botão flutuante, CTA final, footer) | `click_intent` |
| `solution_click` | "Falar sobre esta solução" nos cards de soluções | `click_intent` |
| `partnership_click` | "Conversar sobre uma parceria" (seção de software houses) | `click_intent` |
| `lead_form_submit` | Formulário validado, logo antes de abrir o WhatsApp | `form_intent` |

### Parâmetros

| Parâmetro | Exemplo | Observação |
|---|---|---|
| `section` | `hero`, `solucoes`, `software_houses`, `formulario` | Seção de origem |
| `button_id` | `hero_diagnostico`, `solucao_cashback` | Identificação do botão |
| `solution_category` | `cashback`, `ia`, `parceria` | Quando aplicável |
| `lead_type` | `empresa`, `software_house` | Quando aplicável |
| `destination` | `whatsapp` | Sempre `whatsapp` |
| `intent_level` | `click_intent`, `form_intent` | Diferencia clique de formulário |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | `google`, `cpc`… | Quando existirem |
| `has_gclid` | `true` | O valor do gclid **não** é enviado nos eventos |

**Dados pessoais não são enviados.** Nome, empresa, telefone, ERP digitado e descrição seguem apenas para a mensagem do WhatsApp, nunca para o dataLayer.

## 3. Clique não é lead

Esses eventos medem **intenção**. A página não consegue saber se a mensagem foi de fato enviada no WhatsApp, nem se virou uma oportunidade.

- `lead_form_submit`: a pessoa preencheu e validou o formulário. É o sinal de intenção mais forte. Use como **conversão principal**.
- `whatsapp_click`, `solution_click` e `partnership_click`: só cliques. Use como **conversões secundárias** (marcadas como "secundária" no Google Ads, para não entrarem nos lances).
- **Lead qualificado e venda** devem ser registrados fora da página: no CRM ou numa planilha, e depois enviados ao Google Ads como **conversões offline** usando o `gclid`. O gclid fica guardado na sessão. Com consentimento de publicidade, também fica no `localStorage` por até 90 dias. Para que o time comercial receba a origem, ative `NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION=true`: um código "Ref.: google / cpc / campanha" é acrescentado à mensagem.

## 4. Configurar o GTM

1. **Variáveis → Nova → Variável da camada de dados**. Crie uma para cada parâmetro: `section`, `button_id`, `solution_category`, `lead_type`, `intent_level`, `destination`.
2. **Acionadores → Evento personalizado**:
   - `lead_form_submit`
   - `whatsapp_click|solution_click|partnership_click` (com "Usar correspondência de regex")
3. **Tags**:
   - *Tag do Google* (GA4) com o ID `G-XXXX`, acionador "Initialization – All Pages".
   - *Evento do GA4*: nome `{{Event}}`, com os parâmetros acima, nos dois acionadores.
   - *Acompanhamento de conversões do Google Ads*: uma tag para `lead_form_submit` (principal) e outra para os cliques (secundária).
   - *Vinculador de conversões* (Conversion Linker) em todas as páginas.
4. **Admin → Configurações do contêiner → Ativar visão geral do consentimento**. As tags do Google já respeitam o Consent Mode v2 de forma nativa. Tags de terceiros devem exigir `ad_storage` ou `analytics_storage`.
5. No GA4, marque `lead_form_submit` como **evento-chave**.

## 5. Configurar o modo direto (sem GTM)

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=AbCdEf123        # conversão principal
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL=XyZ987        # conversão secundária
```

## 6. Consentimento

- Padrão: `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` ficam como `denied`. Também ficam ativos `ads_data_redaction` e `url_passthrough`.
- Sem consentimento, as tags do Google enviam apenas pings sem cookies (modelagem do Consent Mode).
- A escolha é reaplicada em cada visita antes de carregar o GTM.
- Para refazer a escolha durante os testes, rode `localStorage.removeItem('lp_consent_v1')` no console.

## 7. Testar

1. Abra `/?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc`.
2. GTM: use o **Preview** (Tag Assistant). Modo direto: use o **DebugView** do GA4.
3. Ou, no console do navegador, rode `dataLayer.filter(e => e.event)`.
