# afinados-site

Site público do Afinados (landing e, a partir da Fase 2, a documentação), em Astro, publicado no Cloudflare Pages no apex `afinados.io`.

Plano e fases em `afinados-planning/development/site-afinados.md`.

## Desenvolvimento

```sh
npm install
npm run dev      # servidor local
npm run build    # gera dist/
npm run preview  # serve o dist/
```

## Publicação

O pipeline da `main` builda o site e faz deploy no Cloudflare Pages (`wrangler pages deploy`). O repositório privado no GitLab é espelhado no GitHub público pelo job `sync-github`.
