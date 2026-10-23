# MemoCart Docs

Documentação pública do [MemoCart](https://memocart.link), publicada em [docs.memocart.link](https://docs.memocart.link).

O site é Astro Starlight, com a referência da API gerada do OpenAPI versionado. O build gera um site estático em `./dist`. Um Cloudflare Worker (`memocart-docs`) serve esses arquivos na zona `memocart.link`.

O conteúdo em português fica na raiz. A versão em inglês fica em `/en/`.

## Requisitos

- [Bun](https://bun.sh)
- Node.js 26.3.0. O Astro roda no Node do sistema, e a versão mínima está em `package.json` (`engines.node`). O `mise.toml` e o CI instalam 26.3.0.
- [mise](https://mise.jdx.dev) (opcional; as mesmas tarefas estão no `package.json`)

## Rodar

```sh
bun install
bun run dev
```

O site sobe em `http://localhost:4321`.

Para gerar `./dist`:

```sh
bun run build
```

Com mise, as tarefas equivalentes são `mise run dev` e `mise run build`.

## Sincronizar a API

A referência é gerada de `openapi/openapi.json`. O build não baixa nada: ele usa o arquivo do repositório.

```sh
bun run sync:openapi
```

O script busca `https://api.memocart.link/openapi.json` e substitui `openapi/openapi.json` só quando a resposta é um documento OpenAPI. Se o endpoint não responder, o comando falha e o arquivo local permanece como está.

O arquivo commitado neste repositório é a especificação obtida desse endpoint (MemoCart API 0.1.0). Não é um placeholder.

Se um dia o endpoint estiver fora e ainda não existir cópia versionada, o placeholder precisa deixar isso explícito em `info.description`, com o prefixo `[PLACEHOLDER]`, para não ser lido como a API real. Não invente paths nesse arquivo.

A documentação de guias também não descreve endpoints, limites, preços ou recursos que não estejam no OpenAPI.

## Publicar

O deploy acontece no push para `main`, pelo workflow `.github/workflows/deploy.yml`. Ele instala as dependências com Bun, roda `bun run build` e publica com `bunx wrangler deploy`.

O workflow lê estes secrets do GitHub, que não ficam no repositório:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

O Worker `memocart-docs` serve `./dist` em `docs.memocart.link` (zona `memocart.link`). O subdomínio `workers.dev` fica desligado. Pull requests rodam só o build, em `.github/workflows/ci.yml`.

Para publicar da máquina local, com as mesmas variáveis de ambiente:

```sh
bun run build
bunx wrangler deploy
```

A tarefa `mise run deploy` executa `bunx wrangler deploy` e espera que `./dist` já exista.
