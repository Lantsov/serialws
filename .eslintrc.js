module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Поддержка современных возможностей ECMAScript
        sourceType: 'module', // Использование модулей ES
    },
    env: {
        node: true, // Для поддержки глобальных переменных Node.js
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Добавление prettier как плагина ESLint
    ],
    plugins: ['@typescript-eslint', 'import', 'node', 'promise', 'prettier'],
    rules: {
        'prettier/prettier': 'error', // Показ ошибок prettier как ошибок ESLint
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
};
