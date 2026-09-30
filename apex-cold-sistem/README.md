# Ápex Cold Sistem: landing page para Google Ads

Página estática (HTML, CSS e JS puros, sem build) feita para receber tráfego do Google Ads e converter visitas em conversas no WhatsApp.

Para publicar, basta enviar a pasta `apex-cold-sistem/` inteira para qualquer hospedagem estática (Cloudflare Pages, Netlify, Vercel, Hostinger, etc.). Para ver localmente:

```bash
cd apex-cold-sistem
python3 -m http.server 8080   # abra http://localhost:8080
```

## Estrutura

| Seção | Observações |
| --- | --- |
| Banner | Foto real da central de condensadoras; `hero-desktop.webp` e `hero-mobile.webp` com recortes diferentes |
| Clientes atendidos | Carrossel infinito de logos, pausa ao passar o mouse |
| Serviços | Câmara fria, manutenção, instalação, PMOC, VRF e VRV. Cada card tem um botão de WhatsApp com mensagem própria |
| Diferenciais | Garantia de 6 meses em destaque |
| Como funciona | 4 passos |
| Galeria | 14 fotos reais do cliente, com lightbox |
| Avaliações | Carrossel no estilo Google, alimentado por `assets/js/reviews.js` |
| FAQ, CTA final, rodapé | |
| Pop-up | Abre após 30 s, uma vez por sessão; não abre se a pessoa já clicou no WhatsApp |
| Botão flutuante | WhatsApp fixo no canto da tela |

## Onde editar

- **Número do WhatsApp:** `WHATSAPP` em `assets/js/main.js` e os `href="https://wa.me/..."` do `index.html` (esses servem de reserva caso o JS não carregue).
- **Mensagens pré-preenchidas:** atributo `data-msg` de cada botão.
- **Avaliações:** adicione avaliações reais em `assets/js/reviews.js`. Com a lista vazia, a seção e o link do menu ficam ocultos. Para ver o layout, abra a página com `?demo-avaliacoes` (os cards aparecem marcados como exemplo).
- **Tempo do pop-up:** `POPUP_DELAY_MS` em `assets/js/main.js`.

## Conversões (Google Ads / GTM)

Cole o snippet do Google Tag Manager ou do gtag no `<head>` (há um comentário indicando o lugar). Todo clique em WhatsApp dispara:

```js
dataLayer.push({ event: 'whatsapp_click', cta_location: 'hero' | 'servico-pmoc' | 'popup' | 'flutuante' | ... })
```

e também `gtag('event', 'whatsapp_click', ...)` se o gtag estiver na página. No GTM, crie um acionador de evento personalizado `whatsapp_click` ligado à tag de conversão do Google Ads.

## Imagens

- `assets/img/gallery/`, banner, serviço "Câmara fria" e "Instalação", pop-up e CTA final: **fotos reais enviadas pelo cliente**.
- Serviços "Manutenção", "PMOC", "VRF" e "VRV": fotos do [Pexels](https://www.pexels.com/license/) (uso comercial gratuito, sem necessidade de atribuição): IDs 6471912, 32588555, 38228166 e 5463587.
- Logos de clientes: Wikimedia Commons (Riachuelo, Casas Bahia, Drogarias Pacheco, KFC, Natura, O Boticário, Itaú), sites oficiais (Patroni, Griletto, HNT, Viena, Batata Inglesa via IMC) e seeklogo (Pontofrio, Drogaria São Paulo, Bacio di Latte, Mr. Cheney). As marcas não foram alteradas. HNT e Griletto só têm versão branca, por isso aparecem sobre a cor oficial de cada marca.
