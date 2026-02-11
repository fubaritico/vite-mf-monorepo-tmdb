/**
 * @fileoverview ESLint configuration for http-client package.
 *
 * Generated client files in src/client/ are ignored via .eslintignore.
 */
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['src/client/**'],
  }
)
