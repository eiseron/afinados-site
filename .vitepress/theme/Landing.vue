<script setup lang="ts">
import { useData } from "vitepress";

const appUrl = "https://app.afinados.io";
const githubUrl = "https://github.com/eiseron/afinados";
const year = new Date().getFullYear();

const { lang } = useData();

const pt = {
  homeHref: "/",
  docsHref: "/docs/",
  privacyHref: "/docs/legal/privacy",
  termsHref: "/docs/legal/terms",
  navTools: "Ferramentas",
  navDocs: "Documentação",
  navSim: "Abrir o simulador",
  heroTitle: "Prepare sua moto com método, não no chute.",
  heroLead:
    "O Afinados reúne ferramentas de cálculo para preparação de moto. A primeira já está no ar: estima a geometria do carburador e mostra, em uma curva, como cada mudança de agulha, gicle, clip ou venturi altera a passagem de combustível. Mais ferramentas vêm a caminho.",
  ctaPrimary: "Abrir o simulador",
  ctaGhost: "Ver a documentação",
  carbAlt: "Carburador sendo montado em um motor de moto",
  concepts: [
    {
      title: "Uma curva por acerto",
      body: "Plota a área livre de passagem de combustível ao longo do acelerador, do ponto morto à plena carga.",
    },
    {
      title: "Comparação com sinal",
      body: "Sobreponha dois acertos e veja onde um tem mais área (verde) ou menos (vermelho) que o outro.",
    },
    {
      title: "Sem cadastro",
      body: "Salve seus acertos no próprio navegador e abra cada um por uma URL própria. Nada de conta.",
    },
  ],
  bandTitle: "Da bancada à pista",
  bandIntro:
    "Entenda a curva, compare acertos e leve pro motor só o que os números sustentam. Menos achismo, mais método.",
  kartAlt: "Kart de corrida em alta velocidade numa pista",
  toolsTitle: "Ferramentas",
  toolsIntro:
    "O Afinados cresce em ferramentas de preparação. Hoje, o acerto de carburador. Em breve, mais frentes da preparação de moto.",
  tool1Title: "Área de passagem de combustível",
  tool1Body:
    "Estime e compare a área de passagem de um carburador Mikuni ao longo da posição do acelerador.",
  tool1Link: "Abrir a ferramenta",
  soon: "Em breve",
  tool2Title: "Dimensionamento de venturi",
  tool2Body: "Estime o tamanho ideal do venturi do carburador.",
  howTitle: "Como funciona",
  steps: [
    {
      n: "1",
      title: "Monte o acerto",
      body: "Escolha agulha, difusor, gicles, clip, calço e venturi a partir do catálogo.",
    },
    {
      n: "2",
      title: "Leia a curva",
      body: "Alterne o eixo entre abertura do acelerador e curso da agulha conforme precisar.",
    },
    {
      n: "3",
      title: "Compare acertos",
      body: "Salve e sobreponha acertos para enxergar a diferença antes de pôr a mão no motor.",
    },
  ],
  ctaTitle: "Acerte com números, não no chute.",
  ctaButton: "Abrir o simulador",
  yzAlt: "Moto de trilha Yamaha YZ250 numa pista de areia",
  disclaimer:
    "O Afinados dá estimativas geométricas, não vazões medidas. Não substitui teste em bancada, dinamômetro ou pista. Acerte por sua conta e risco.",
  footerDocs: "Documentação",
  footerPrivacy: "Privacidade",
  footerTerms: "Termos de uso",
  footerGithub: "Código fonte no GitHub",
  footerCopy: `Afinados, um produto da Eiseron. ${year}.`,
};

const en = {
  homeHref: "/en/",
  docsHref: "/en/docs/",
  privacyHref: "/en/docs/legal/privacy",
  termsHref: "/en/docs/legal/terms",
  navTools: "Tools",
  navDocs: "Documentation",
  navSim: "Open the simulator",
  heroTitle: "Tune your bike with method, not guesswork.",
  heroLead:
    "Afinados is a set of calculation tools for motorcycle preparation. The first is already live: it estimates carburetor geometry and shows, in a curve, how each change of needle, jet, clip or venturi alters fuel passage. More tools are on the way.",
  ctaPrimary: "Open the simulator",
  ctaGhost: "Read the docs",
  carbAlt: "A carburetor being fitted to a motorcycle engine",
  concepts: [
    {
      title: "One curve per setup",
      body: "Plots the free fuel-passage area across throttle, from idle to full open.",
    },
    {
      title: "Signed comparison",
      body: "Overlay two setups and see where one has more area (green) or less (red) than the other.",
    },
    {
      title: "No account",
      body: "Save your setups in your own browser and open each by its own URL. No sign-up.",
    },
  ],
  bandTitle: "From the bench to the track",
  bandIntro:
    "Understand the curve, compare setups and take to the engine only what the numbers support. Less guessing, more method.",
  kartAlt: "A racing kart at speed on a track",
  toolsTitle: "Tools",
  toolsIntro:
    "Afinados grows in preparation tools. Today, carburetor tuning. Soon, more fronts of motorcycle preparation.",
  tool1Title: "Fuel-passage area",
  tool1Body:
    "Estimate and compare the fuel-passage area of a Mikuni carburetor across throttle position.",
  tool1Link: "Open the tool",
  soon: "Coming soon",
  tool2Title: "Venturi sizing",
  tool2Body: "Estimate the ideal carburetor venturi size.",
  howTitle: "How it works",
  steps: [
    {
      n: "1",
      title: "Build the setup",
      body: "Pick needle, needle jet, jets, clip, shim and venturi from the catalog.",
    },
    {
      n: "2",
      title: "Read the curve",
      body: "Switch the axis between throttle opening and needle travel as needed.",
    },
    {
      n: "3",
      title: "Compare setups",
      body: "Save and overlay setups to see the difference before touching the engine.",
    },
  ],
  ctaTitle: "Tune with numbers, not guesswork.",
  ctaButton: "Open the simulator",
  yzAlt: "A Yamaha YZ250 dirt bike on a sand track",
  disclaimer:
    "Afinados gives geometric estimates, not measured flow. It does not replace bench, dyno, or track testing. Tune at your own risk.",
  footerDocs: "Documentation",
  footerPrivacy: "Privacy",
  footerTerms: "Terms of use",
  footerGithub: "Source on GitHub",
  footerCopy: `Afinados, an Eiseron product. ${year}.`,
};

const t = lang.value.startsWith("en") ? en : pt;
</script>

<template>
  <div class="afn-landing">
    <header class="topbar">
      <div class="container">
        <a class="brand" :href="t.homeHref">Afinados</a>
        <nav class="nav">
          <a class="nav-extra" href="#ferramentas">{{ t.navTools }}</a>
          <a class="nav-extra" :href="t.docsHref">{{ t.navDocs }}</a>
          <a :href="appUrl">{{ t.navSim }}</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container split">
          <div class="hero-copy">
            <h1>{{ t.heroTitle }}</h1>
            <p class="lead">{{ t.heroLead }}</p>
            <p class="hero-actions">
              <a class="button button-primary" :href="appUrl">{{ t.ctaPrimary }}</a>
              <a class="button button-ghost" :href="t.docsHref">{{ t.ctaGhost }}</a>
            </p>
          </div>
          <div class="split-media">
            <img class="split-img" src="/carburador.webp" :alt="t.carbAlt" width="1800" height="1200" />
          </div>
        </div>
      </section>

      <section class="concepts">
        <div class="container">
          <ul class="card-grid concepts-grid">
            <li class="card" v-for="c in t.concepts" :key="c.title">
              <h2 class="card-title">{{ c.title }}</h2>
              <p>{{ c.body }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="split-section">
        <div class="container split">
          <div class="split-media">
            <img class="split-img" src="/kart.webp" :alt="t.kartAlt" width="1800" height="1012" loading="lazy" />
          </div>
          <div>
            <h2 class="section-title">{{ t.bandTitle }}</h2>
            <p class="section-intro">{{ t.bandIntro }}</p>
          </div>
        </div>
      </section>

      <section id="ferramentas" class="tools">
        <div class="container">
          <h2 class="section-title">{{ t.toolsTitle }}</h2>
          <p class="section-intro">{{ t.toolsIntro }}</p>

          <ul class="card-grid tools-grid">
            <li class="card tool-card">
              <span class="tool-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 38 C 22 36, 28 18, 40 10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                  <line x1="8" y1="38" x2="40" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                  <line x1="8" y1="38" x2="8" y2="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </svg>
              </span>
              <h3 class="card-title">{{ t.tool1Title }}</h3>
              <p>{{ t.tool1Body }}</p>
              <a class="tool-link" :href="appUrl">{{ t.tool1Link }}</a>
            </li>

            <li class="card tool-card tool-card-soon">
              <span class="badge">{{ t.soon }}</span>
              <span class="tool-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8 L36 8 L27 24 L36 40 L12 40 L21 24 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                </svg>
              </span>
              <h3 class="card-title">{{ t.tool2Title }}</h3>
              <p>{{ t.tool2Body }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="how">
        <div class="container">
          <h2 class="section-title">{{ t.howTitle }}</h2>
          <ol class="steps">
            <li class="step" v-for="s in t.steps" :key="s.n">
              <span class="step-n" aria-hidden="true">{{ s.n }}</span>
              <div>
                <h3 class="card-title">{{ s.title }}</h3>
                <p>{{ s.body }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="split-section cta">
        <div class="container split">
          <div class="cta-copy">
            <h2 class="section-title">{{ t.ctaTitle }}</h2>
            <p class="hero-actions">
              <a class="button button-primary" :href="appUrl">{{ t.ctaButton }}</a>
            </p>
          </div>
          <div class="split-media">
            <img class="split-img" src="/yz250.webp" :alt="t.yzAlt" width="1800" height="1200" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="disclaimer">
        <div class="container">
          <p>{{ t.disclaimer }}</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container">
        <ul class="footer-links">
          <li><a :href="t.docsHref">{{ t.footerDocs }}</a></li>
          <li><a :href="t.privacyHref">{{ t.footerPrivacy }}</a></li>
          <li><a :href="t.termsHref">{{ t.footerTerms }}</a></li>
          <li><a :href="githubUrl" target="_blank" rel="noopener noreferrer">{{ t.footerGithub }}</a></li>
        </ul>
        <p>{{ t.footerCopy }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.afn-landing {
  --bg: light-dark(#e9ebea, #181a19);
  --bg-elev: light-dark(#fbfcfb, #212322);
  --fg: light-dark(#15150f, #ededdf);
  --muted: light-dark(#55544b, #a9a596);
  --primary: light-dark(#121210, #ededdf);
  --primary-fg: light-dark(#fbfbf8, #121210);
  --accent: light-dark(#e8460c, #ff5a24);
  --accent-fg: #fbfbf8;
  --border: light-dark(#c8cac9, #2f312f);
  --container: 64rem;
  --radius: 0.75rem;

  color-scheme: light dark;
  background: var(--bg);
  color: var(--fg);
  min-height: 100dvh;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}

.afn-landing :deep(*) {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: 1.5rem;
}

h1,
h2,
h3 {
  line-height: 1.15;
  letter-spacing: -0.01em;
}

/* Top bar */
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #000;
  border-bottom: 1px solid rgba(251, 251, 248, 0.12);
}

.topbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.75rem;
}

.brand {
  font-weight: 800;
  font-size: 1.1rem;
  text-decoration: none;
  color: #fbfbf8;
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav a {
  color: rgba(251, 251, 248, 0.72);
  text-decoration: none;
  font-size: 0.95rem;
  white-space: nowrap;
}

.nav a:hover {
  color: #fbfbf8;
}

/* Buttons */
.button {
  display: inline-block;
  padding: 0.7rem 1.4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
}

.button-primary {
  background: var(--primary);
  color: var(--primary-fg);
}

.button-primary:hover {
  filter: brightness(1.12);
}

.button-ghost {
  color: var(--fg);
  border-color: var(--border);
}

.button-ghost:hover {
  background: var(--bg-elev);
}

/* Sections */
section {
  padding-block: 4rem;
}

.section-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin: 0 0 0.5rem;
}

.section-intro {
  color: var(--muted);
  max-width: 38rem;
  margin: 0;
}

/* Split */
.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

.split-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.hero {
  padding-block: 4rem;
}

.hero-copy h1 {
  font-size: clamp(2rem, 5.5vw, 3.25rem);
  margin: 0 0 1rem;
  text-wrap: balance;
}

.lead {
  font-size: 1.15rem;
  color: var(--muted);
  margin: 0 0 1.75rem;
  max-width: 36rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
}

.split-section {
  padding-block: 3.5rem;
}

.cta .section-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
}

/* Cards and steps */
.card-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.card {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.card p {
  margin: 0;
  color: var(--muted);
}

.card-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.concepts {
  padding-block: 3.5rem 1.5rem;
}

.concepts-grid {
  grid-template-columns: 1fr;
}

.tools-grid {
  grid-template-columns: 1fr;
}

.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tool-icon {
  color: var(--accent);
  width: 2.75rem;
  height: 2.75rem;
}

.tool-icon svg {
  width: 100%;
  height: 100%;
}

.tool-link {
  margin-top: auto;
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
}

.tool-link::after {
  content: " \2192";
}

.tool-card-soon {
  opacity: 0.72;
}

.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent);
  color: var(--accent-fg);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step p {
  margin: 0.25rem 0 0;
  color: var(--muted);
}

.step-n {
  flex: none;
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: var(--accent-fg);
  font-weight: 700;
}

.disclaimer {
  padding-block: 2.5rem 4rem;
}

.disclaimer p {
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: var(--bg-elev);
  border-left: 4px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--fg);
}

/* Footer */
.site-footer {
  background: #000;
  border-top: 1px solid rgba(251, 251, 248, 0.12);
  color: rgba(251, 251, 248, 0.6);
  padding-block: 2.5rem;
  font-size: 0.95rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}

.footer-links a {
  color: rgba(251, 251, 248, 0.72);
  text-decoration: none;
}

.footer-links a:hover {
  color: #fbfbf8;
}

@media (max-width: 40rem) {
  .nav {
    gap: 1rem;
  }
  .nav-extra {
    display: none;
  }
}

@media (min-width: 48rem) {
  .split {
    grid-template-columns: 1fr 1fr;
  }
  .concepts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
