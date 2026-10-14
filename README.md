# Spotfly

Uma experiência musical independente, inspirada em padrões comuns de players de música e construída com React + Vite. Não é um produto oficial do Spotify nem usa seu código-fonte privado.

## Estado atual

- Interface escura responsiva para desktop e celular.
- Início, explorar, pesquisa de faixas, álbuns, artistas e playlists.
- Player com play/pause, anterior/próxima, progresso, volume, shuffle, repetição e fila.
- Músicas curtidas e playlists persistidas no navegador.
- Catálogo de demonstração e fontes de áudio de exemplo. Os áudios são amostras técnicas, não as gravações reais indicadas nos metadados.
- Notas de engenharia reversa e CI de build.

## Desenvolvimento

Requer Node.js 22+ recomendado.

```bash
npm install
npm run dev
```

## Validar o build

```bash
npm run build
npm run preview
```

## REA — observação de interface

Consulte [docs/REVERSE_ENGINEERING.md](docs/REVERSE_ENGINEERING.md) e [docs/REA_WORKFLOW.md](docs/REA_WORKFLOW.md). A observação instrumentada depende de um navegador/CDP acessível no ambiente de execução; este repositório não declara capturas que ainda não foram feitas.

## Limites do protótipo

Não há backend, contas, sincronização entre dispositivos ou catálogo musical licenciado. O armazenamento atual é local ao navegador. Integrações oficiais do Spotify exigem credenciais próprias, autorização do usuário e conformidade com as políticas atuais da plataforma.
