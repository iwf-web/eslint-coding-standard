# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@iwf-web/eslint-coding-standard`, an npm package providing standardized ESLint configurations for IWF projects. It wraps `@antfu/eslint-config` with IWF-specific customizations for TypeScript and React.

## Commands

```bash
# Build the package (transpile to ESM + generate .d.mts types)
pnpm prepack

# Lint the codebase
pnpm eslint .

# Type check
pnpm ts:check
```

Note: Tests are not yet implemented.

## Architecture

The package exports two configs from separate entry points:

- **`iwfWebStandardTs`** (`src/standard-ts.ts`) — Full config with TypeScript strict checking, React, and all style rules. Imports and extends the JS config.
- **`iwfWebStandardJs`** (`src/standard-js.ts`) — Base config with React and style rules, without TypeScript.
- **`src/index.ts`** — Barrel re-export of both configs.

`standard-js.ts` also exports `baseOptions` and `baseRules` constants, which `standard-ts.ts` imports to extend with TS-specific rules.

### Consumer usage

```typescript
// TypeScript project
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard';
export default iwfWebStandardTs();

// JavaScript-only project
import { iwfWebStandardJs } from '@iwf-web/eslint-coding-standard';
export default iwfWebStandardJs();

// Subpath imports also available
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard/standard-ts';
```

Both functions accept `(options?, ...userConfigs)` — options override `antfu()` defaults, userConfigs are additional ESLint flat config objects appended after the IWF rules.

## Code Style Enforced by This Config

- Semicolons required
- Curly braces required for all control statements
- 120 character line length (warning)
- Single quotes, 2-space indentation
- No spaces inside object braces: `{foo: bar}`
- Arrow function parameters always wrapped in parentheses

## Build System

- **tsdown**: Builds ESM output to `dist/` with TypeScript declarations. Entry points: `src/index.ts`, `src/standard-js.ts`, `src/standard-ts.ts`. The `exports: true` option auto-updates package.json exports.
- **pnpm**: Required package manager (version locked)
- **Conventional Commits**: Used for automated releases via release-please
