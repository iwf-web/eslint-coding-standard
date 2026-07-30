# ESLint Coding Standard

A standardized ESLint configuration package for IWF projects. Built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config), it provides an opinionated, pre-configured setup optimized for TypeScript and React applications.

[![License](https://img.shields.io/github/license/iwf-web/eslint-coding-standard)][license]
[![Version](https://img.shields.io/npm/v/@iwf-web/eslint-coding-standard?label=latest%20release)][npm]
[![Downloads](https://img.shields.io/npm/dt/@iwf-web/eslint-coding-standard)][npm]

## Configurations

The package provides two configs:

- **Standard TypeScript** (`iwfWebStandardTs`) — Full config with TypeScript strict checking, React, and all style rules. Use this for TypeScript projects.
- **Standard JavaScript** (`iwfWebStandardJs`) — Base config with React and style rules, without TypeScript. Use this for JS-only projects.

The TypeScript config extends the JavaScript one, so all JS/React rules are included automatically.

Both configs build on `@antfu/eslint-config` with the following customizations:

### Code Style

- **Semicolons**: Required at statement ends
- **Curly braces**: Required for all control statements
- **Arrow functions**: Parentheses around single parameters
- **Max line length**: 120 characters (exceptions for comments, strings, and URLs)
- **Object spacing**: No spaces inside braces (`{foo: bar}`)
- **Quote style**: Single quotes, with object properties quoted only when required

### TypeScript

- Strict type checking enabled with project-based tsconfig detection
- Allows promises in event handlers (e.g., `onClick`)
- Relaxed `any` type restrictions for third-party library interoperability

### React

- Full React support with hooks linting
- Allows common child manipulation patterns (`cloneElement`, `children.map`, etc.)
- Const declarations allowed for components

### Disabled Features

- JSONC, YAML, and Markdown linting disabled

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm, npm, or yarn
- TypeScript 6 or lower for TypeScript projects — see below if you want TypeScript 7

### TypeScript 7

`typescript-eslint`, which powers the type-aware rules, cannot run on TypeScript 7: version 7.0 ships no programmatic API, so importing it crashes with `TypeError: Cannot read properties of undefined`. A stable API is expected in TypeScript 7.1. Until then, install both compilers side by side as described in the [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/):

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

`tsc` then runs the native TypeScript 7 compiler, while everything that imports the `typescript` module — ESLint, editors, bundlers — keeps getting the TypeScript 6 API. The TypeScript 6 compiler stays available as `tsc6`.

Keep the `@typescript/native` name. Package managers resolve the duplicate `tsc` binary differently, and this name is the one that works everywhere:

- **pnpm** and **Yarn Classic (1.x)** — works as is.
- **npm** — picks the winning binary by lexical sort, so a name sorting after `typescript` (such as the `typescript-7` used in early versions of the announcement) hands `tsc` to TypeScript 6 instead.
- **Yarn Berry** — needs 4.18.0 or newer, which [prefers direct dependency binaries](https://github.com/yarnpkg/berry/pull/7216). On older versions, transitive binaries win and `tsc` resolves to TypeScript 6; set `nmHoistingLimits: dependencies` in `.yarnrc.yml` as a workaround.

### Installation

```bash
pnpm add -D @iwf-web/eslint-coding-standard
```

Or with npm:

```bash
npm install -D @iwf-web/eslint-coding-standard
```

### Usage

Create an `eslint.config.js` (or `eslint.config.ts`) file in your project root:

#### TypeScript projects

```js
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard';

export default iwfWebStandardTs();
```

#### JavaScript-only projects

```js
import { iwfWebStandardJs } from '@iwf-web/eslint-coding-standard';

export default iwfWebStandardJs();
```

#### Subpath imports

Each config is also available as a direct subpath import:

```js
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard/standard-ts';
import { iwfWebStandardJs } from '@iwf-web/eslint-coding-standard/standard-js';
```

#### With Custom Options

You can pass options to override the default configuration:

```js
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard';

export default iwfWebStandardTs({
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
});
```

#### With Additional ESLint Configs

You can append additional ESLint flat config objects:

```js
import { iwfWebStandardTs } from '@iwf-web/eslint-coding-standard';

export default iwfWebStandardTs(
  {},
  {
    rules: {
      'no-console': 'warn',
    },
  },
);
```

### Migration from v1

The function names have been updated to match the `@iwf-web` package scope:

- `iwfStandardTs` → `iwfWebStandardTs`
- `iwfStandardJs` → `iwfWebStandardJs`

The old names still work but are deprecated and will be removed in the next major version.

## Contributing

Please read [CONTRIBUTING.md][contributing] for details on our code of conduct and the process for submitting pull requests.

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated releases and changelog generation.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For available versions, see the [tags on this repository][gh-tags].

## Authors

### Special thanks for all the people who had helped this project so far

- **Manuele** - [D3strukt0r](https://github.com/D3strukt0r)

See also the full list of [contributors][gh-contributors] who participated in this project.

### I would like to join this list. How can I help the project?

We're currently looking for contributions for the following:

- [ ] Bug fixes
- [ ] Translations
- [ ] etc...

For more information, please refer to our [CONTRIBUTING.md][contributing] guide.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Acknowledgments

This project currently uses no third-party libraries or copied code.

[license]: https://github.com/iwf-web/eslint-coding-standard/blob/main/LICENSE.txt
[npm]: https://www.npmjs.com/package/@iwf-web/eslint-coding-standard
[gh-tags]: https://github.com/iwf-web/eslint-coding-standard/tags
[gh-contributors]: https://github.com/iwf-web/eslint-coding-standard/contributors
[contributing]: https://github.com/iwf-web/.github/blob/main/CONTRIBUTING.md
