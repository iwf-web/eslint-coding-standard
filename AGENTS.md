# AGENTS.md

This file provides guidance to coding agents (Claude Code, etc.) when working with code in this repository. `CLAUDE.md` simply imports this file via `@AGENTS.md`.

## Project Overview

This is `@iwf-web/eslint-coding-standard`, an npm package providing standardized ESLint configurations for IWF projects. It wraps `@antfu/eslint-config` with IWF-specific customizations for TypeScript and React.

## Commands

```bash
pnpm build       # Transpile src/ to ESM in dist/ + generate .d.mts types (tsdown --clean --dts)
pnpm prepack     # Same as build, via @antfu/ni (`nr build`); runs automatically on publish
pnpm lint        # Lint the codebase (dogfoods this package's own config)
pnpm lint:fix    # Lint and auto-fix
pnpm ts:check    # Type check (tsc --noEmit)
```

Note: `pnpm test` is a placeholder that errors — tests are not yet implemented.

## Architecture

The package exports two configs from separate entry points:

- **`iwfWebStandardTs`** (`src/standard-ts.ts`) — Full config with TypeScript strict checking, React, and all style rules. Imports `baseOptions`/`baseRules` from the JS config and layers on `tsRules`.
- **`iwfWebStandardJs`** (`src/standard-js.ts`) — Base config with React and style rules, without TypeScript. Defines and exports `baseOptions` and `baseRules`.
- **`src/index.ts`** — Barrel re-export of both configs.

Both functions accept `(options?, ...userConfigs)` — `options` shallow-merge over the IWF `baseOptions` (and override `antfu()` defaults), `userConfigs` are additional ESLint flat config objects appended after the IWF rules. Each module also exports a deprecated alias (`iwfStandardTs`/`iwfStandardJs`) kept for backward compat — slated for removal in the next major version (search `TODO: Remove`).

`eslint.config.ts` at the repo root applies `iwfWebStandardTs()` to this repo itself, so linting changes here is the primary way to verify the config behaves as intended.

### Consumer usage

```typescript
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard';
export default iwfWebStandardTs();
// Subpath imports also available: '@iwf-web/eslint-coding-standard/standard-ts'
```

## Code Style Enforced by This Config

Defined in `baseRules` (`src/standard-js.ts`) and `tsRules` (`src/standard-ts.ts`); each rule carries an inline comment explaining its rationale. Highlights:

- Semicolons required; curly braces required for all control statements
- 120 char line length (warning; ignores comments/strings)
- Single quotes, 2-space indentation, no spaces inside object braces (`{foo: bar}`)
- Arrow function params always parenthesized; object props quoted only as needed
- TS: relaxed `any` restrictions for third-party interop, promises allowed in event handlers
- React: hooks linting on, common children-manipulation patterns allowed

## Build & Release

- **tsdown**: Builds ESM-only output to `dist/` with declarations. Entry points configured in `tsdown.config.ts`. `exports: true` auto-syncs `package.json` exports — do not hand-edit the `exports` field.
- **pnpm**: Required package manager (version locked via `packageManager`).
- **Conventional Commits**: Drive automated releases via release-please (`release-please-config.json`, `.release-please-manifest.json`).
- **Node 18+** required by consumers; dev container uses Node 24.
