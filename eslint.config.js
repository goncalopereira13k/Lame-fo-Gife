import eslintJs from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    { ignores: ['build', 'node_modules', 'coverage', '.yarn'] },
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2020,
                ...globals.jest,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'import': importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...eslintJs.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-console': 'error',
            'indent': ['error', 4, {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1,
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1,
                },
                CallExpression: {
                    arguments: 1,
                },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoredNodes: [],
                ignoreComments: false,
            }],
            'object-curly-spacing': ['error', 'always'],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'no-unused-vars': 'off',
            'no-param-reassign': ['error', {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc',
                    'accumulator',
                    'e',
                    'ctx',
                    'req',
                    'request',
                    'res',
                    'response',
                    '$scope',
                    'staticContext',
                    'state',
                ],
            }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
            'keyword-spacing': ['error', {
                before: true,
                after: true,
                overrides: {
                    return: { after: true },
                    throw: { after: true },
                    case: { after: true },
                },
            }],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'arrow-spacing': ['error', { before: true, after: true }],

            // IMPORT
            'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
            'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
            quotes: ['error', 'single', { avoidEscape: true }],
            // REACT HOOKS
            'react-hooks/exhaustive-deps': 'off',

            //STYLE
            'object-shorthand': ['error', 'always', {
                ignoreConstructors: false,
                avoidQuotes: true,
            }],

            //REACT
            'jsx-quotes': ['error', 'prefer-double'],
        },
    },
);