# Rastreamento: GTM, GA4 e Google Ads

Este documento explica como o site mede as interações e como configurar as conversões no Google Tag Manager e no Google Ads sem contar a mesma interação duas vezes.

## 1. Como funciona

| Peça | Arquivo | O que faz |
|---|---|---|
| Carregamento das tags | `src/components/analytics/TrackingScripts.tsx` | Define o Consent Mode v2 (tudo negado por padrão), reaplica a escolha salva do visitante e carrega o GTM **ou** o gtag.js. Nunca os dois. |
| Banner de consentimento | `src/components/analytics/ConsentBanner.tsx` | Aceitar / Recusar / Personalizar (Análise e Publicidade) |
| Consentimento | `src/lib/tracking/consent.ts` | Salva a escolha em `localStorage` (`lp_consent_v1`) e chama `gtag('consent','update')` |
| Atribuição | `src/lib/tracking/attribution.ts` | Captura `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid` e `wbraid` |
| Eventos | `src/lib/tracking/events.ts` | Envia os eventos ao `dataLayer` (GTM) ou ao `gtag` (modo direto) |
| Visualização de projetos | `src/components/analytics/TrackOnView.tsx` | Dispara `project_view` quando um projeto do portfólio fica visível |

### Modos

- **GTM (recomendado, ativo)**: o contêiner `GTM-WJSKRNDB` é o padrão em `src/config/tracking.ts`; `NEXT_PUBLIC_GTM_ID` o substitui, se definida. Os eventos vão para o `dataLayer` e você configura GA4 e Google Ads dentro do GTM.
- **Direto**: sem GTM, defina `NEXT_PUBLIC_GA4_ID` e/ou `NEXT_PUBLIC_GOOGLE_ADS_ID`. O gtag.js envia os eventos e, se houver rótulos configurados, as conversões do Ads.
- Com o GTM definido, o modo direto é ignorado. Isso evita carregar as tags duas vezes e contar cada hit em dobro.

> **Atenção:** no modo GTM, não instale também a tag do Google (gtag.js) diretamente no site nem no Google Ads, e não crie duas tags de conversão para o mesmo evento. É a causa mais comum de conversões duplicadas.

## 2. Páginas

| Rota | `page_type` |
|---|---|
| `/` | `home` |
| `/integracao-de-sistemas` | `lp_integracao` |
| `/desenvolvimento-de-software` | `lp_desenvolvimento` |
| `/privacidade` | `privacidade` |

## 3. Eventos

Cada interação dispara **um único** evento. Cliques repetidos no mesmo botão dentro de 1,5 s são ignorados.

| Evento | Quando dispara | `intent_level` | Uso no Google Ads |
|---|---|---|---|
| `lead_form_submit` | Formulário de diagnóstico validado, logo antes de abrir o WhatsApp | `form_intent` | **Conversão principal** |
| `whatsapp_click` | CTAs de WhatsApp: header, hero, portfólio, CTA final, botão flutuante, footer | `click_intent` | Secundária |
| `solution_click` | "Falar sobre esta solução" nos cards de soluções | `click_intent` | Secundária |
| `partnership_click` | "Conversar sobre uma parceria tecnológica" (fornecedores de ERP) | `click_intent` | Secundária (ou ação própria, se quiser medir parcerias à parte) |
| `project_view` | Um projeto do portfólio fica pelo menos 50% visível (1x por projeto por carregamento de página) | `view` | **Não** usar como conversão. Só engajamento no GA4. |

O envio do formulário gera **apenas** `lead_form_submit`. Ele não gera `whatsapp_click`, embora abra o WhatsApp. Assim a mesma interação não é contada duas vezes.

### Parâmetros

| Parâmetro | Exemplo | Observação |
|---|---|---|
| `page_path` | `/integracao-de-sistemas` | Caminho sem query string (a URL pode conter o gclid) |
| `page_type` | `home`, `lp_integracao`, `lp_desenvolvimento` | Ver seção 2 |
| `button_location` | `hero`, `header`, `solucoes`, `portfolio`, `parcerias`, `formulario`, `cta_final`, `botao_flutuante`, `footer` | Onde a interação aconteceu |
| `button_id` | `hero_diagnostico`, `solucao_integracao`, `projeto_cashback` | Identificação do elemento |
| `solution_category` | `integracao`, `desenvolvimento`, `geral`, `cashback` | Nos cards de soluções, no formulário (categoria da página) e no portfólio |
| `lead_type` | `empresa`, `software_house` | Quando aplicável |
| `destination` | `whatsapp` | Em todos os eventos, exceto `project_view` |
| `intent_level` | `view`, `click_intent`, `form_intent` | Diferencia visualização, clique e formulário |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | `google`, `cpc`… | Quando existirem |
| `has_gclid`, `has_gbraid`, `has_wbraid` | `true` | Os valores dos identificadores **não** são enviados nos eventos |
| `section` | `hero` | **Obsoleto.** Igual a `button_location`, mantido para não quebrar variáveis já criadas no GTM |

**Dados pessoais não são enviados.** Nome, sistema informado e necessidade descrita vão só para a mensagem do WhatsApp, nunca para o dataLayer ou para o GA4.

## 4. Clique, formulário e lead efetivo

A página mede **intenção**. Ela não sabe se a mensagem foi de fato enviada no WhatsApp nem se virou uma oportunidade.

| Nível | O que significa | Onde é medido |
|---|---|---|
| Clique no WhatsApp | A pessoa clicou em um botão. Pode desistir antes de enviar. | `whatsapp_click`, `solution_click`, `partnership_click` |
| Envio do formulário | A pessoa descreveu a necessidade e foi levada ao WhatsApp com a mensagem pronta. É o sinal mais forte disponível na página. | `lead_form_submit` |
| Lead comercial efetivo | A mensagem chegou e o contato tem perfil para uma proposta. | **Fora da página**: no CRM ou numa planilha, importado no Google Ads como conversão offline |

### Registrar leads efetivos (recomendado)

1. Ative `NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION=true`. Toda mensagem passa a terminar com um código como `Ref.: google / cpc / campanha` (sem dados pessoais).
2. Quando um contato virar lead qualificado ou contrato, registre na planilha a data, a campanha e o valor.
3. No Google Ads, crie uma ação **Importação → Conversões de cliques** e importe a planilha periodicamente. Para importar pelo gclid, o time comercial precisa obter o identificador do clique. Na prática, com poucos leads, registrar a campanha pelo código `Ref.` já permite avaliar o resultado de cada grupo de anúncios.

O gclid/gbraid/wbraid fica guardado na sessão do navegador. Com consentimento de publicidade, também fica no `localStorage` por até 90 dias.

## 5. Configurar o GTM

### 5.1 Variáveis

**Variáveis → Nova → Variável da camada de dados**, uma para cada parâmetro: `page_path`, `page_type`, `button_location`, `button_id`, `solution_category`, `lead_type`, `intent_level`, `destination`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.

### 5.2 Acionadores (Evento personalizado)

| Nome | Nome do evento | Regex |
|---|---|---|
| CE - lead_form_submit | `lead_form_submit` | não |
| CE - cliques WhatsApp | `whatsapp_click\|solution_click\|partnership_click` | sim |
| CE - project_view | `project_view` | não |

### 5.3 Tags

| Tag | Tipo | Acionador |
|---|---|---|
| Tag do Google (GA4) | Tag do Google, ID `G-XXXX` | Initialization – All Pages |
| GA4 - eventos | Evento do GA4, nome `{{Event}}`, parâmetros da seção 5.1 | Os três acionadores acima |
| Vinculador de conversões | Conversion Linker | All Pages |
| Ads - Lead formulário | Acompanhamento de conversões do Google Ads (ID e rótulo da ação "Lead formulário") | CE - lead_form_submit |
| Ads - Clique WhatsApp | Acompanhamento de conversões do Google Ads (ID e rótulo da ação "Clique WhatsApp") | CE - cliques WhatsApp |

Não crie tag de conversão do Ads para `project_view`.

### 5.4 Consentimento e publicação

1. **Admin → Configurações do contêiner → Ativar visão geral do consentimento.** As tags do Google respeitam o Consent Mode v2 de forma nativa. Tags de terceiros devem exigir `ad_storage` ou `analytics_storage`.
2. Teste no **Preview** (Tag Assistant) e confira que cada interação dispara **uma** tag de conversão.
3. Publique o contêiner.

### 5.5 Navegação entre páginas

Os links internos (por exemplo, do rodapé para as páginas de serviço) usam navegação do lado do cliente. Para o GA4 registrar essas visualizações, mantenha ativa em **Fluxo de dados → Medição otimizada** a opção "Mudanças de página com base em eventos do histórico do navegador" (vem ativa por padrão).

## 6. Configurar o Google Ads

1. **Metas → Conversões → Nova ação de conversão → Site → Configurar manualmente**:
   - **Lead formulário**: categoria "Enviar formulário de lead", contagem **Uma**, ação **principal**.
   - **Clique WhatsApp**: categoria "Contato", contagem **Uma**, ação **secundária** (fica nos relatórios mas não entra nos lances).
2. Copie o ID (`AW-...`) e o rótulo de cada ação para as tags do GTM (seção 5.3).
3. Contagem **Uma** faz várias interações do mesmo clique no anúncio valerem uma conversão. É o recomendado para leads.
4. Use como URL final de cada grupo de anúncios:
   - Integração de sistemas, integração de API/software, integração com ERP → `https://www.thdsolutions.com.br/integracao-de-sistemas`
   - Empresa de desenvolvimento de software/sistemas, software sob medida, desenvolvimento de API → `https://www.thdsolutions.com.br/desenvolvimento-de-software`
5. Mantenha a **codificação automática** (auto-tagging) ativa para o gclid ser acrescentado às URLs. Se usar UTMs, coloque-as no "Sufixo do URL final", por exemplo: `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}`.
6. Com orçamento pequeno (R$ 30/dia), o volume de conversões é baixo para lances automáticos por conversão nos primeiros dias. Comece com "Maximizar cliques" (com CPC máximo) ou CPC manual e avalie as conversões manualmente.

### Evitar contagem dupla: resumo

- Só um carregador de tags: GTM **ou** gtag direto (o site garante isso).
- Uma única tag de conversão por evento no GTM.
- O formulário gera só `lead_form_submit`, nunca `whatsapp_click`.
- `project_view` não é conversão.
- Cliques repetidos em 1,5 s são descartados no próprio site.
- Contagem **Uma** nas ações de conversão do Google Ads.
- Não importe metas do GA4 para o Ads se já usar as tags de conversão do Ads para os mesmos eventos.

## 7. Modo direto (sem GTM)

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=AbCdEf123        # conversão principal (lead_form_submit)
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL=XyZ987        # conversão secundária (cliques)
```

Nesse modo, `project_view` vai só para o GA4, sem conversão.

## 8. Consentimento

- Padrão: `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` ficam como `denied`. Também ficam ativos `ads_data_redaction` e `url_passthrough`, que preserva os identificadores de clique na navegação mesmo sem cookies.
- Sem consentimento, as tags do Google enviam apenas pings sem cookies (modelagem do Consent Mode).
- A escolha é reaplicada em cada visita antes de carregar o GTM.
- Para refazer a escolha durante os testes, rode `localStorage.removeItem('lp_consent_v1')` no console.

## 9. Testar

1. Abra `/integracao-de-sistemas?utm_source=google&utm_medium=cpc&utm_campaign=teste&gclid=abc`.
2. GTM: use o **Preview** (Tag Assistant). Modo direto: use o **DebugView** do GA4.
3. Ou, no console do navegador, rode `dataLayer.filter(e => e.event)`.
4. Confira que nenhum evento contém nome, sistema ou descrição digitados no formulário.
