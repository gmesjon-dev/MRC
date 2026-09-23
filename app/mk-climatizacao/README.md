# Landing page — MK Climatização (Fortaleza)

Rota pública `/mk-climatizacao`, destino dos anúncios do Google Ads. Todos os
CTAs abrem o WhatsApp (85) 99215-8851 e disparam `whatsapp_click` no
`dataLayer` (ver `trackWaClick` para ligar a conversão do Ads).

## Antes de publicar

- `public/mk/logo.svg` é uma logo provisória. Substitua pela logo oficial da MK
  (quadrada; o site já recorta em círculo) e ajuste as cores `--brand-*` em
  `mk-landing.css` se a paleta da logo for diferente.
- Avaliações (`TESTIMONIALS`) e a nota 4.9 / 138 avaliações são ilustrativas —
  troque pelas avaliações reais do Perfil da Empresa no Google.

## Origem das imagens e vídeos

Fotos do [Unsplash](https://unsplash.com/license) e vídeos do
[Mixkit](https://mixkit.co/license/#videoFree), ambos com licença gratuita para
uso comercial. Para trocar por fotos reais da MK, basta substituir os arquivos
em `public/mk/` mantendo os mesmos nomes.

| Arquivo | Origem |
| --- | --- |
| hero-desktop.jpg (espelhada), hero-mobile.jpg | unsplash.com/photos 1761330439671 · 1761330440311 |
| service-instalacao.jpg | Unsplash 1642749776312 |
| service-manutencao.jpg | Unsplash 1737012197886 |
| service-recarga-gas.jpg | Unsplash 1694532438941 |
| service-pmoc.jpg | Unsplash 1705579604902 |
| service-eletrico.jpg | Unsplash 1660330589693 |
| service-higienizacao.jpg | Unsplash 1762341123870 |
| popup.jpg | Unsplash 1759772238012 |
| about-us.jpg / why-us.jpg | Unsplash 1625148230889 / 1561400555 |
| gallery-01…08.jpg | Unsplash 1722131646940, 1667983453881, 1765634219706, 1745745593296, 1738617456836, 1774290331891, 1621905251189, 1545649311 |
| video-01.mp4 / video-02.mp4 | Mixkit 15052 / 49185 |
