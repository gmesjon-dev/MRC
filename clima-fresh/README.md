# Clima Fresh Climatização — Landing page (Google Ads)

Página estática (HTML + CSS + JS puro, sem build) focada em conversão via WhatsApp.

- `index.html` — página
- `assets/css/style.css` — estilos (paleta extraída da logo)
- `assets/js/main.js` — links do WhatsApp, carrossel de avaliações, galeria/lightbox, pop-up (30s)
- `assets/img/` — logo redonda, banner desktop/mobile, imagens de serviços e galeria

## Publicar
Suba a pasta `clima-fresh/` em qualquer hospedagem estática (Hostinger, Netlify, Cloudflare Pages, Vercel...).

## Ajustes rápidos
- **WhatsApp**: constante `WHATSAPP` em `assets/js/main.js` (`5582982107480`). A mensagem de cada botão fica no atributo `data-msg`.
- **Google Ads**: descomente o bloco `gtag` no `<head>` de `index.html` e troque `AW-XXXXXXXXXX`; em `main.js` troque `AW-XXXXXXXXXX/YYYYYYYY` pelo rótulo de conversão. Todo clique em botão de WhatsApp também envia `whatsapp_click` para o `dataLayer` (GTM).
- **Pop-up**: `POPUP_DELAY_MS` em `main.js` (30000 = 30s). Aparece uma vez por sessão.
- **Avaliações**: array `reviews` em `main.js`.
- **Números** (1.500 serviços, 98%, 24h, 90 dias) e nota "5,0 / 87 avaliações": confirmar com o cliente em `index.html`.

## Créditos das imagens
Fotos enviadas pelo cliente + fotos gratuitas do Pexels e Unsplash (licença livre para uso comercial).
