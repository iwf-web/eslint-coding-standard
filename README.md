# ESLint Coding Standard

A standardized ESLint configuration package for IWF projects. Built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config), it provides an opinionated, pre-configured setup optimized for TypeScript and React applications.

[![License](https://img.shields.io/github/license/iwf-web/eslint-coding-standard)][license]
[![Version](https://img.shields.io/npm/v/@iwf-web/eslint-coding-standard?label=latest%20release)][npm]
[![Downloads](https://img.shields.io/npm/dt/@iwf-web/eslint-coding-standard)][npm]

## Configurations

This configuration extends `@antfu/eslint-config` with the following customizations:

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

```js
import { iwf } from '@iwf-web/eslint-coding-standard';

export default iwf();
```

#### With Custom Options

You can pass options to override the default configuration:

```js
import { iwf } from '@iwf-web/eslint-coding-standard';

export default iwf({
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
});
```

#### With Additional ESLint Configs

You can append additional ESLint flat config objects:

```js
import { iwf } from '@iwf-web/eslint-coding-standard';

export default iwf(
  {},
  {
    rules: {
      'no-console': 'warn',
    },
  },
);
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated releases and changelog generation.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For available versions, see the [tags on this repository][gh-tags].

## Authors

All authors can be found in the [AUTHORS.md](AUTHORS.md) file.

Contributors can be found in the [CONTRIBUTORS.md](CONTRIBUTORS.md) file.

See also the full list of [contributors][gh-contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Acknowledgments

A list of used libraries and code with their licenses can be found in the [ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md) file.

[license]: https://github.com/iwf-web/eslint-coding-standard/blob/main/LICENSE.txt
[npm]: https://www.npmjs.com/package/@iwf-web/eslint-coding-standard
[gh-tags]: https://github.com/iwf-web/eslint-coding-standard/tags
[gh-contributors]: https://github.com/iwf-web/eslint-coding-standard/contributors
