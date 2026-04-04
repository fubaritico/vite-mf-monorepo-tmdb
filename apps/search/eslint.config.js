import rootEsLingConfig from '../../eslint.config.js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  rootEsLingConfig,
  {
    ignores: ['dist', '.___mf__temp', 'nodes_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  }
)
