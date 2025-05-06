import EslintConfigPrettier from 'eslint-config-prettier';
import EslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  EslintConfigPrettier,
  EslintPluginPrettierRecommended,
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:prettier/recommended',
    ],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  }),
];

export default eslintConfig;
