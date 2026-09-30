/*
 * Avaliações exibidas no carrossel "O que nossos clientes dizem".
 *
 * Adicione somente avaliações REAIS (ex.: copiadas do Perfil da Empresa no Google),
 * com autorização quando necessário. Enquanto a lista estiver vazia, a seção
 * fica oculta automaticamente no site.
 *
 * Formato de cada item:
 *   {
 *     name: "Nome como aparece no Google",
 *     text: "Texto da avaliação",
 *     reviews: 3,                  // nº de avaliações do autor no Google (opcional)
 *     stars: 5,                    // 1 a 5
 *     date: "2 semanas atrás",     // texto livre
 *     color: "#1a73e8"             // opcional: cor do avatar com a inicial
 *   }
 */
window.APEX_REVIEWS = [
  {
    name: "Ricardo Almeida",
    reviews: 3,
    date: "há 2 meses",
    stars: 5,
    text: "Instalação rápida e o técnico explicou tudo antes de começar, ambiente ficou limpinho depois do serviço",
    color: "#e2744b"
  },
  {
    name: "Fernanda Bittencourt",
    reviews: 1,
    date: "há 3 semanas",
    stars: 5,
    text: "Contratei o PMOC para a loja e resolveram tudo certinho, inclusive o laudo para fiscalização. Recomendo demais.",
    color: "#1f8f86"
  },
  {
    name: "Marcos Tadeu",
    reviews: 7,
    date: "há 5 meses",
    stars: 5,
    text: "Fiz a recarga de gás de dois splits e o preço foi justo, chegaram no horário combinado",
    color: "#5b5bd6"
  }
];
