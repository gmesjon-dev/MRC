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
| Banner | Foto real de câmara fria com portas de vidro; `hero-desktop.webp` (foto à direita, esmaecendo à esquerda) e `hero-mobile.webp` (foto inteira no topo) |
| Marcas | Carrossel infinito com as marcas de climatização e refrigeração, pausa ao passar o mouse |
| Avaliações | Logo após as marcas. Carrossel no estilo Google (arrastar no celular, setas no desktop), alimentado por `assets/js/reviews.js` |
| Serviços | Câmara fria, manutenção, instalação, PMOC, VRF e VRV. Cada card tem um botão de WhatsApp com mensagem própria |
| Diferenciais | Garantia de 6 meses em destaque |
| Como funciona | 4 passos |
| Trabalhos realizados | 11 fotos reais do cliente em cards com filtro (Câmaras frias, Montagem, Elétrica) e lightbox. Nenhuma foto se repete em outra seção |
| FAQ, CTA final, rodapé | |
| Pop-up | Abre após 30 s, uma vez por sessão; não abre se a pessoa já clicou no WhatsApp |
| Botão flutuante | WhatsApp fixo no canto da tela (desktop) |
| Barra de orçamento | Barra verde fixa no rodapé da tela, só no celular |

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

- `assets/img/trabalhos/`, banner, serviço "Câmara fria" e "Instalação", pop-up e CTA final: **fotos reais enviadas pelo cliente**.
- Serviços "Manutenção", "PMOC", "VRF" e "VRV": fotos do [Pexels](https://www.pexels.com/license/) (uso comercial gratuito, sem necessidade de atribuição): IDs 6471912, 32588555, 38228166 e 5463587.
- Logos das marcas (Daikin, LG, Samsung, Carrier, Midea, Gree, Fujitsu, Trane, Elgin, Danfoss, Bitzer, Embraco): seeklogo, sem alteração nas marcas. Para trocar ou incluir, adicione o arquivo em `assets/img/marcas/` e um `<li>` na seção `#marcas`.
