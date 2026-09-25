# MK Climatização — Landing page (Google Ads)

Site estático (HTML + CSS + JS puro, sem build). Basta publicar a pasta `mk-climatizacao/` em qualquer hospedagem (Cloudflare Pages, Netlify, Hostinger, etc.).

## Estrutura

- `index.html` — página única
- `assets/css/style.css` — estilos (paleta baseada na logo: marinho, azul elétrico e prata)
- `assets/js/main.js` — WhatsApp, rastreamento, carrossel, galeria/lightbox e pop-up
- `assets/img/` — logo redonda, hero desktop/mobile, serviços, galeria e marcas atendidas (carrossel)
- `assets/logo-source.html` — fonte vetorial da logo (abrir no navegador e exportar em outro tamanho, se precisar)

## Antes de subir os anúncios

1. **Tag do Google Ads**: cole o snippet (gtag.js ou GTM) no `<head>` do `index.html`, no comentário indicado,
   e preencha `adsConversion` em `assets/js/main.js` com `AW-XXXXXXXXX/rótulo` para contar cada clique no WhatsApp como conversão.
   Todo clique também envia o evento `whatsapp_click` (com a origem do botão) para o `dataLayer`.
2. **Avaliações**: os depoimentos são exemplos no formato do Google. Troque pelos textos reais do Perfil da Empresa
   (e ajuste a nota/quantidade no cartão "EXCELENTE" e no hero).
3. **Pop-up**: a oferta de 10% OFF precisa ser confirmada com o cliente (texto no final do `index.html`).
4. Horários de atendimento no rodapé e área atendida: confirmar com o cliente.

## Contato configurado

WhatsApp: +55 (85) 99215-8851 — cada botão abre a conversa com uma mensagem própria (serviço/seção de origem).

## Créditos de imagens

Fotos do cliente (pasta `gallery/mk-*`, higienização e elétrico) + fotos gratuitas do Pexels e Unsplash (hero, demais serviços, sobre e `gallery/st-*`).
