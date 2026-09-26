# LP Sebrae RS Agro

Redesign da landing page institucional do **Sebrae RS Agro** ([página original](https://conhecimento.sebraers.com.br/lp/agro/)), com o mesmo conteúdo e uma linguagem visual inspirada nas páginas de produto da Apple, usando a paleta oficial do Sebrae Agro.

## Destaques

- **Nav local translúcida** com efeito fosco (`backdrop-filter`)
- **Hero expansível**: a foto começa num quadro arredondado com o texto por cima e abre até ocupar a tela, revelando o bloco "40 anos" (adaptado do `ScrollExpand` do React Bits)
- **Números em boxes** com os dígitos dobrando em 3D ao entrar na tela (adaptado do `FoldText` do React Bits)
- **Bento grid** das frentes de atuação, com todo o conteúdo visível nos cards
- **Spotlight nos cards**: brilho verde que segue o mouse (adaptado do `SpotlightCard` do [React Bits](https://reactbits.dev))
- **Entrada dos boxes no scroll** com GSAP + ScrollTrigger (adaptado do `AnimatedContent` do React Bits)
- **Acessível**: navegação por teclado, foco visível, respeita `prefers-reduced-motion` e `prefers-reduced-transparency`
- **Responsivo**: layouts colapsam para uma coluna abaixo de 768px

## Estrutura

```
lp-agro-sebrae/
├── index.html                    página completa (abre direto no navegador / GitHub Pages)
├── assets/
│   ├── css/style.css             estilos, todos escopados em .agr-*
│   └── js/main.js                painéis, spotlight e animações
└── elementor/
    └── lp-agro-elementor.html    versão arquivo único, pronta pra colar num widget HTML do Elementor
```

## Stack

- HTML, CSS e JavaScript puros (sem build)
- [GSAP 3](https://gsap.com) + ScrollTrigger (CDN)
- [Phosphor Icons](https://phosphoricons.com) (CDN)
- Fonte [Figtree](https://fonts.google.com/specimen/Figtree)

## Paleta

| Token | Cor | Uso |
|---|---|---|
| `--agr-green` | `#6DC067` | destaque, spotlight, botões sobre fundo escuro |
| `--agr-forest` | `#38663D` | botões, links, ícones |
| `--agr-deep` | `#0F2414` | tiles e cards escuros |
| `--agr-mint` | `#E8F4E5` | superfícies claras de apoio |
| `--agr-bg` | `#F5F7F4` | fundo da página |

## Como rodar

Abre o `index.html` no navegador. Pra publicar no GitHub Pages: **Settings → Pages → Deploy from branch → main / root**.

## Créditos

Conteúdo e imagens: Sebrae RS. Efeitos de hero expansível, números dobrando, spotlight e entrada adaptados de componentes do [React Bits](https://reactbits.dev) para JavaScript puro.
