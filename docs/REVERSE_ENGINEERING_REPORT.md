# Spotfly — Relatório de engenharia reversa funcional (v0.1)

Data da pesquisa: 2026-10-14

## Escopo e limites

Este relatório documenta uma análise funcional inicial baseada em documentação pública oficial e na arquitetura observável de um player musical web. Não afirma que houve inspeção instrumentada do Spotify Web, captura de rede ou execução do REA: esse trabalho depende de um navegador/ambiente de execução que ainda não está conectado a esta sessão. Nenhum código-fonte privado foi obtido ou reproduzido.

Objetivo: construir um produto independente com padrões de interação semelhantes, código próprio, conteúdo de demonstração/licenciado e interfaces desacopladas.

## Fontes primárias

- Spotify Web Playback SDK: https://developer.spotify.com/documentation/web-playback-sdk
- Tutorial oficial do SDK: https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started
- Tutorial de player web: https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player/
- Referência do SDK: https://developer.spotify.com/documentation/web-playback-sdk/reference
- Políticas e quota de API: https://developer.spotify.com/documentation/web-api/concepts/quota-modes
- Guia de migração Web API 2026: https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide
- Política do conteúdo e metadados de faixas: https://developer.spotify.com/documentation/web-api/reference/get-track

## Mapa funcional a validar

### Navegação e páginas
1. Início: prateleiras de conteúdo e recomendações.
2. Pesquisa: entrada de consulta, resultados categorizados e estados vazios/erro.
3. Biblioteca: playlists, álbuns e artistas salvos, com filtros e ordenação.
4. Detalhe de álbum/playlist/artista: cabeçalho, ações principais e lista de faixas.
5. Player persistente: faixa atual, controles, progresso e volume.
6. Fila/histórico e painel de reprodução expandido, quando disponíveis.

### Estados de reprodução
- Inativo, carregando, reproduzindo, pausado e erro.
- Mudança de faixa; avanço/retrocesso; busca na linha do tempo.
- Aleatório e repetição; volume mudo/restaurado.
- Fila atualizada ao adicionar/remover faixas.
- Controles acessíveis por teclado e rótulos para leitores de tela.
- Reprodução bloqueada por políticas de autoplay deve exibir feedback acionável.

### Persistência
- Biblioteca e playlists locais devem sobreviver ao recarregamento.
- A faixa atual e as preferências podem persistir separadamente da fila transitória.
- Estado de interface deve ter fonte única de verdade; evitar cópias divergentes de playlists dentro de componentes.

### Responsividade
- Desktop: navegação lateral, conteúdo central e player persistente.
- Telas menores: navegação compacta, cards fluidos e player adaptado.
- Verificar larguras pequenas, overflow horizontal, foco visível e áreas de toque.

## Arquitetura sugerida para Spotfly

- React + Vite para UI.
- Rotas/página e componentes de apresentação separados.
- Um estado central para player/fila.
- Adaptador de áudio independente (HTMLAudioElement para demonstração e fontes autorizadas; integração oficial opcional em módulo separado).
- Catálogo e pesquisa atrás de uma interface de serviço, sem acoplar a UI a uma API específica.
- Persistência local para playlists de demonstração.
- Testes de unidade para reducer/estado do player e testes de interface para navegação e controles.
- CI para instalação reproduzível, build e testes.

## Restrições de integração Spotify

O Web Playback SDK oficial é uma opção para controlar/reproduzir conteúdo Spotify dentro dos termos da plataforma; a documentação indica que requer Premium. O acesso à Web API e o modo de desenvolvimento têm requisitos e quotas que podem mudar. A integração deve ser opcional e validada contra os termos atuais. Não baixar, extrair ou redistribuir áudio protegido. Conteúdo e arte vindos da API precisam respeitar as regras de atribuição e uso da plataforma.

## Plano de observação com REA

1. Verificar Node compatível e executar npx rea-agents@latest --help.
2. Executar npx rea-agents@latest setup apenas após revisar o que o comando configura.
3. Identificar a ferramenta de observação de sessão web e abrir uma sessão pública do Spotify Web no navegador controlado.
4. Registrar rotas, ações, transições e estados visíveis em cenários curtos: abrir Início, pesquisar, abrir um álbum, interagir com a fila e redimensionar.
5. Registrar evidências reproduzíveis, sem capturar credenciais, dados privados, cookies ou tokens.
6. Comparar com o Spotfly e converter discrepâncias em issues/testes.

### Bloqueio atual
As ferramentas GitHub disponíveis permitem ler/gravar arquivos e commits, mas não expõem diretamente o terminal interativo ou o navegador do Codespace nesta conversa. Portanto, o REA ainda não foi executado aqui e os itens acima continuam como plano de investigação, não como observações já concluídas.

## Próximos critérios de aceite

- [ ] Executar build e testes em CI e inspecionar os logs.
- [ ] Confirmar cada fluxo de navegação e reprodução com evidência.
- [ ] Cobrir estados vazios, erros e carregamento.
- [ ] Validar layout em desktop e mobile.
- [ ] Documentar limitações de catálogo/áudio e qualquer requisito de autenticação.