import type {Rules} from '@antfu/eslint-config';
import antfu from '@antfu/eslint-config';
import {baseOptions, baseRules} from './standard-js';

const tsRules = {
  'ts/no-misused-promises': ['off'], // Allow Promises in places like onClick handlers
  'ts/no-unsafe-assignment': ['off'], // Allow some unsafe ('any') assignments (e.g. form.getFieldValue)
  'ts/strict-boolean-expressions': ['error', {allowAny: true}], // Allow 'any' in boolean expressions
  'ts/no-unsafe-argument': ['off'], // Allow using 'any' as function arguments
  'ts/no-unsafe-member-access': ['off'], // Allow optional chaining on 'any' typed objects (e.g. object._meta)
  'ts/no-unsafe-return': ['off'], // Allow returning 'any' typed values
  'ts/no-unsafe-call': ['off'], // Allow calling 'any' typed values
} satisfies Rules;

// eslint-disable-next-line ts/promise-function-async
export function iwfWebStandardTs(
  options?: Parameters<typeof antfu>[0],
  ...userConfigs: Parameters<typeof antfu>[1][]
): ReturnType<typeof antfu> {
  return antfu(
    {
      ...baseOptions,
      typescript: {
        tsconfigPath: 'tsconfig.json',
      },
      ...options,
    },
    {
      languageOptions: {
        parserOptions: {
          projectService: {
            allowDefaultProject: ['*.js', '*.ts'], // Include TS files in the root project as well
          },
        },
      },
    },
    {
      rules: {...baseRules, ...tsRules},
    },
    ...userConfigs,
  );
}

/**
 * @deprecated Use {@link iwfWebStandardTs} instead. Will be removed in the next major version.
 */
// TODO: Remove in next major version
export const iwfStandardTs: typeof iwfWebStandardTs = iwfWebStandardTs;
