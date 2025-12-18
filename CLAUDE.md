# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@iwf-web/eslint-coding-standard`, an npm package providing a standardized ESLint configuration for IWF projects. It wraps `@antfu/eslint-config` with IWF-specific customizations for TypeScript and React.

## Commands

```bash
# Build the package (transpile to ESM + generate .d.mts types)
pnpm prepack

# Lint the codebase
pnpm eslint .
```

Note: Tests are not yet implemented.

## Architecture

Single-file package exporting the `iwf()` function from `src/index.ts`:

```typescript
import { iwf } from '@iwf-web/eslint-coding-standard';

// Basic usage
export default iwf();

// With options override
export default iwf({ typescript: { tsconfigPath: './tsconfig.app.json' } });

// With additional ESLint configs appended
export default iwf({}, { rules: { 'no-console': 'warn' } });
```

The function wraps `antfu()` from `@antfu/eslint-config`, enabling React support and applying IWF rule customizations.

## Code Style Enforced by This Config

- Semicolons required
- Curly braces required for all control statements
- 120 character line length (warning)
- Single quotes, 2-space indentation
- No spaces inside object braces: `{foo: bar}`
- Arrow function parameters always wrapped in parentheses

## Build System

- **tsdown**: Builds ESM output to `dist/` with TypeScript declarations
- **pnpm**: Required package manager (version locked)
- **Conventional Commits**: Used for automated releases via release-please
