# QClima Ar-Condicionado — Landing page (Google Ads)

Página estática (HTML + CSS + JS puro, sem build) focada em conversão via WhatsApp.

- `index.html` — página
- `assets/css/style.css` — estilos (paleta extraída da logo)
- `assets/js/main.js` — links do WhatsApp, carrossel de avaliações, galeria/lightbox, pop-up (30s)
- `assets/img/` — logo redonda, banner desktop/mobile, imagens de serviços e galeria

## Publicar
Suba a pasta `qclima/` em qualquer hospedagem estática (Hostinger, Netlify, Cloudflare Pages, Vercel...).

## Ajustes rápidos
- **WhatsApp**: constante `WHATSAPP` em `assets/js/main.js` (`5581991796425`). A mensagem de cada botão fica no atributo `data-msg`.
- **Google Ads**: descomente o bloco `gtag` no `<head>` de `index.html` e troque `AW-XXXXXXXXXX`; em `main.js` troque `AW-XXXXXXXXXX/YYYYYYYY` pelo rótulo de conversão. Todo clique em botão de WhatsApp também envia `whatsapp_click` para o `dataLayer` (GTM).
- **Pop-up**: `POPUP_DELAY_MS` em `main.js` (30000 = 30s). Aparece uma vez por sessão.
- **Avaliações**: array `reviews` em `main.js`.
- **Números** (1.500 serviços, 98%, 24h, 90 dias), nota "5,0 / 127 avaliações" e oferta de 10% OFF do pop-up: confirmar com o cliente em `index.html`.

## Créditos das imagens
Quadros extraídos dos vídeos enviados pelo cliente + fotos gratuitas do Pexels e Unsplash (licença livre para uso comercial).
