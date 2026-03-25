import type {Rules} from '@antfu/eslint-config';
import antfu from '@antfu/eslint-config';

export const baseOptions: Parameters<typeof antfu>[0] = {
  jsonc: false,
  yaml: false,
  markdown: false,

  react: true,
};

export const baseRules: Rules = {
  curly: ['error', 'all'], // Enforce using curly braces ("{}") for all control statements

  'style/max-len': ['warn', {code: 120, ignoreComments: true, ignoreStrings: true}],
  'style/semi': ['error', 'always'], // Enforce semicolons at the end of statements
  'style/arrow-parens': ['error', 'always'], // Enforce parentheses around a single parameter in arrow functions
  'style/brace-style': ['error', '1tbs'], // Don't break line after closing brace
  'style/member-delimiter-style': ['error', {multiline: {delimiter: 'semi'}}], // Use semicolons to separate e.g. interface members
  'style/jsx-one-expression-per-line': ['off'], // Allow multiple expressions per line in JSX including text nodes
  'style/object-curly-spacing': ['error', 'never'], // No spaces inside curly braces (e.g., {foo: bar} instead of { foo: bar }
  'style/quote-props': ['error', 'as-needed'], // Only quote object properties when required

  'antfu/top-level-function': ['off'], // Allow using const for React components
  'antfu/consistent-list-newline': ['off'], // Allow compressing lists into multiple items per line

  'react/no-clone-element': ['off'], // Allow using cloneElement (e.g. in FormItems)
  'react/no-children-count': ['off'], // Allow using children count (e.g. in ActionToolbar)
  'react/no-children-map': ['off'], // Allow using children map (e.g. in ActionToolbar)
  'react/no-children-only': ['off'], // Allow using children-only (e.g. in FormItems)
  'react/no-children-to-array': ['off'], // Allow using children to array (e.g. in ActionToolbar)
};

// eslint-disable-next-line ts/promise-function-async
export function iwfWebStandardJs(
  options?: Parameters<typeof antfu>[0],
  ...userConfigs: Parameters<typeof antfu>[1][]
): ReturnType<typeof antfu> {
  return antfu(
    {
      ...baseOptions,
      ...options,
    },
    {
      rules: baseRules,
    },
    ...userConfigs,
  );
}

/**
 * @deprecated Use {@link iwfWebStandardJs} instead. Will be removed in the next major version.
 */
// TODO: Remove in next major version
export const iwfStandardJs: typeof iwfWebStandardJs = iwfWebStandardJs;
