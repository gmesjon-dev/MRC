# QClima — Landing page (Google Ads)

Página estática (HTML + CSS + JS puro), sem build. Basta publicar a pasta `qclima/`
em qualquer hospedagem (Cloudflare Pages, Netlify, Hostinger, etc.).

- `index.html` — estrutura e textos
- `assets/css/style.css` — estilo (paleta extraída da logo: #252481 e #119EEE)
- `assets/js/main.js` — avaliações (`REVIEWS`), galeria (`GALLERY`), pop-up e links de WhatsApp
- `assets/img/` — logo redonda, hero desktop/mobile, fotos dos serviços e galeria (WebP)

## Antes de publicar

1. **Conversão do Google Ads:** cole a tag gtag.js no `<head>` e preencha
   `data-conversion="AW-XXXXXXXXX/YYYYYYYY"` no `<body>`. Todo clique em botão de
   WhatsApp dispara a conversão e também envia `whatsapp_click` para o `dataLayer` (GTM).
2. **Avaliações:** troque os depoimentos de exemplo em `REVIEWS` (main.js), a nota "4,9"
   e o total "112 avaliações" (index.html) pelos dados reais do Google Meu Negócio.
3. **Pop-up:** aparece após 30s, uma vez por sessão (não aparece para quem já clicou no
   WhatsApp). Para testar na hora: `index.html?popup=now`.

Fotos: banco de imagens Pexels (licença gratuita para uso comercial).
