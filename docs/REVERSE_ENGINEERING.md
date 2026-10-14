# Spotfly — Reverse Engineering Notes

Status: initial public-product analysis. This document records observable behavior and implementation requirements; it does not claim access to Spotify's private source code.

## Scope
- Public Spotify Web UI behavior
- Navigation, search, library, playlists, playback controls, queue, responsive states
- Independently implemented Spotfly code

## Evidence categories
- **Observed directly:** must be recorded only after browser interaction or REA observation.
- **Officially documented:** features described in Spotify's public developer/support documentation.
- **Implementation hypothesis:** our own design choice, to be validated against the public UI.

## Initial feature map
1. Home/discovery: recommended content and quick access to recent items.
2. Search: global query and browsable categories/results.
3. Your Library: saved tracks, albums, artists, and playlists; filtering and sorting.
4. Playback: play/pause, previous/next, seek, volume, shuffle, repeat, and queue.
5. Context actions: save/unsave tracks, open album/artist/playlist, add to playlist.
6. Responsive behavior: desktop sidebar and bottom player; compact layouts for smaller screens.

## REA instrumentation status
Not yet executed in the Codespace. No browser session trace is claimed. Next step is to run `npx rea-agents@latest setup` in the development environment and use its available web-session observation tools against the public Spotify Web Player.

## Boundaries
Use public interfaces and authorized developer documentation. Do not extract private source code, bypass authentication, or circumvent technical protections.
