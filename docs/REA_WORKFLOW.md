# REA browser observation workflow

This workflow is intentionally evidence-first. Do not label a feature as directly observed unless a browser capture or user-driven session artifact supports it.

## 1. Install and check REA

Use the development Codespace terminal:

```bash
node --version
npx rea-agents@latest --help
npx rea-agents@latest setup
```

Use a supported Node release documented by the current REA package. Review the setup output before accepting any browser or MCP integration.

## 2. Connect a browser session

REA's browser observation commands require an accessible browser target. If using Chrome DevTools Protocol, launch a dedicated test browser with remote debugging enabled and confirm the target is visible using REA's current `list-browser-targets` command. Do not attach to personal sessions containing private accounts or secrets.

## 3. Observe public Spotify Web

Open `https://open.spotify.com/` in the dedicated browser. Use the current command syntax from `npx rea-agents@latest --help` to inspect the public page and arm `observe-web-session` for user-driven navigation. Record screenshots, visible accessibility labels, route changes, and UI states. Do not extract private source, tokens, or session credentials, and do not attempt to bypass authentication or access controls.

Suggested user-driven scenarios:
- Initial page and loading state
- Open Search and search for a public artist
- Open a public album or playlist page
- Inspect visible player controls and queue affordances
- Resize to a narrow viewport
- Capture empty, loading, and error states when naturally reachable

## 4. Record evidence

For each scenario, note:
- scenario ID and timestamp
- starting URL and ending URL
- actions taken
- visible state transitions
- screenshot or REA Evidence ID
- confidence: observed / official documentation / hypothesis

Do not store authentication headers, access tokens, private account data, or personal library details in the repository.

## 5. Compare Spotfly

Once a capture exists, compare the same public, unauthenticated scenario against Spotfly. Record gaps as issues and implement one coherent change at a time. Treat visual similarity as a target, not proof of equivalent backend behavior.

## Current status

REA has not been executed against a live browser session from this repository's automation channel. The initial product map is based on public product documentation and remains a hypothesis until browser evidence is captured.
